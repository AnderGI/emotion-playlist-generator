import * as amqplib from 'amqplib';

import logger from '../../../../shared/infrastructure/winston/config';
import { DomainEvent } from '../../domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../domain/event/DomainEventSubscriber';
import { AmqpChannelPublishOptions } from './AmqpChannelPublishOptionsFactory';
import { AmqpConnectionSettings } from './AmqpConnectionSettingsFactory';
import DomainEventJsonDeserializer from './DomainEventJsonDeserializer';

type QueueToSubscriber = { queue: string; subscriber: DomainEventSubscriber<DomainEvent> };

export default class RabbitMqConnection {
	private static readonly CREATE_QUEUE_COMMON_OPTIONS: amqplib.Options.AssertQueue = {
		durable: true,
		autoDelete: false,
		exclusive: false
	};

	private static readonly EXCHANGE_NAME = `andergi.domain_events`;
	private static readonly RETRY_SUFFIX = `retry`;
	private static readonly DEAD_LETTER_SUFFIX = 'dead_letter';
	private static readonly TIME_FOR_MESSAGE_TO_LEAVE_QUEUE_MS = 5000;

	private connection!: amqplib.Connection;
	private channel!: amqplib.ConfirmChannel;

	constructor(
		private readonly amqpConnectionSettings: AmqpConnectionSettings,
		private readonly amqpChannelPublishOptions: AmqpChannelPublishOptions,
		private readonly domainEventJsonDeserializer: DomainEventJsonDeserializer
	) {}

	async connect(): Promise<void> {
		try {
			this.connection = await this.createConnection();
			this.channel = await this.createChannel(this.connection);
		} catch (err) {
			console.error('Error al conectar con RabbitMQ:', err);
			await this.close();
			throw err;
		}
	}

	async close(): Promise<void> {
		try {
			await this.channel.close();
			await this.connection.close();
			console.log('Conexión cerrada.');
		} catch (err) {
			console.error('Error al cerrar la conexión o el canal:', err);
		}
	}

	async consume(queuesToSubscribers: QueueToSubscriber[]): Promise<void> {
		await Promise.all(
			queuesToSubscribers.map(queueToSusbcriber =>
				this.channel.consume(
					queueToSusbcriber.queue,
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					this._consume(queueToSusbcriber.subscriber, this.channel)
				)
			)
		);
	}

	async publish(params: { routingKey: string; messageId: string; data: string }): Promise<void> {
		await this.connect();

		const { routingKey, messageId, data } = params;
		try {
			await this.publishMessage(RabbitMqConnection.EXCHANGE_NAME, routingKey, messageId, data);
		} catch (err) {
			console.error('Error al publicar el mensaje:', err);
			throw err;
		}
	}

	async declareExchanges(): Promise<void> {
		await Promise.all([
			this.declareExchange(RabbitMqConnection.EXCHANGE_NAME),
			this.declareExchange(
				`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.RETRY_SUFFIX}`
			),
			this.declareExchange(
				`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`
			)
		]);
	}

	async createQueues(queueToBindings: { queue: string; bindings: string[] }): Promise<void> {
		const { queue, bindings } = queueToBindings;
		await Promise.all([
			this.setupBaseQueue(RabbitMqConnection.EXCHANGE_NAME, queue, bindings),
			this.setupRetryQueue(RabbitMqConnection.EXCHANGE_NAME, queue, bindings),
			this.setupDeadLetterQueue(RabbitMqConnection.EXCHANGE_NAME, queue, bindings)
		]);
	}

	private _consume(
		subscriber: DomainEventSubscriber<DomainEvent>,
		channel: amqplib.ConfirmChannel
	) {
		return async (msg: amqplib.ConsumeMessage | null) => {
			if (msg === null) {
				return;
			}

			try {
				// Procesar el mensaje
				await subscriber.on(this.domainEventJsonDeserializer.deserialize(msg.content.toString()));
				// Confirmar el mensaje como procesado
				channel.ack(msg);
			} catch (error) {
				// Manejar el error y determinar si debe reintentarse o moverse a Dead Letter
				logger.error(`Error procesando mensaje: ${msg.content.toString()}. Error:`, error);
				try {
					await this.handleRetry(msg, subscriber.queueName());
				} catch (retryError) {
					logger.error(`Error manejando reintento o Dead Letter:`, retryError);
				} finally {
					// No hacer ack. Indicar a RabbitMQ que no se procesó correctamente
					channel.nack(msg, false, false); // No requeue: false, no múltiple: false
				}
			}
		};
	}

	private async handleRetry(message: amqplib.ConsumeMessage, queueName: string): Promise<void> {
		try {
			if (this.hasBennRedeliveredTooManyTimes(message)) {
				await this.publishToRetry(message, queueName);
			} else {
				await this.publishToDeadLetter(message, queueName);
			}
		} catch (err) {
			console.error('Error al manejar el reintento o mover a Dead Letter Queue:', err);
		}
	}

	private async publishToRetry(message: amqplib.ConsumeMessage, queueName: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.channel.publish(
				`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.RETRY_SUFFIX}`,
				queueName,
				Buffer.from(message.content.toString()),
				{
					...this.amqpChannelPublishOptions,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					messageId: message.properties.messageId,
					headers: {
						...message.properties.headers
					}
				},
				err => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				}
			);
		});
	}

	private async publishToDeadLetter(
		message: amqplib.ConsumeMessage,
		queueName: string
	): Promise<void> {
		return new Promise((resolve, reject) => {
			this.channel.publish(
				`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`,
				queueName,
				Buffer.from(message.content.toString()),
				{
					...this.amqpChannelPublishOptions,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					messageId: message.properties.messageId,
					headers: {
						...message.properties.headers
					}
				},
				err => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				}
			);
		});
	}

	private hasBennRedeliveredTooManyTimes(message: amqplib.ConsumeMessage): boolean {
		if (!message.properties.headers) {
			message.properties.headers = {};
		}
		if (!message.properties.headers.redelivery_count) {
			message.properties.headers.redelivery_count = 1;
		} else {
			message.properties.headers.redelivery_count += 1;
		}

		return (message.properties.headers.redelivery_count as number) < 3;
	}

	private async setupBaseQueue(exchangeName: string, queue: string, bindings: string[]) {
		// Base queue
		await this.channel.assertQueue(queue, RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS);
		await Promise.all([
			...bindings.map(binding => this.channel.bindQueue(queue, exchangeName, binding)),
			this.channel.bindQueue(queue, exchangeName, queue)
		]);
	}

	private async setupRetryQueue(exchangeName: string, queue: string, bindings: string[]) {
		await this.channel.assertQueue(
			`${queue}.${RabbitMqConnection.RETRY_SUFFIX}`,
			Object.assign({}, RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS, {
				messageTtl: RabbitMqConnection.TIME_FOR_MESSAGE_TO_LEAVE_QUEUE_MS,
				deadLetterExchange: exchangeName,
				deadLetterRoutingKey: queue
			})
		);
		await Promise.all([
			...bindings.map(() =>
				this.channel.bindQueue(
					`${queue}.${RabbitMqConnection.RETRY_SUFFIX}`,
					`${exchangeName}.${RabbitMqConnection.RETRY_SUFFIX}`,
					queue
				)
			)
		]);
	}

	private async setupDeadLetterQueue(exchangeName: string, queue: string, bindings: string[]) {
		// DL queue
		await this.channel.assertQueue(
			`${queue}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`,
			RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS
		);
		await Promise.all([
			...bindings.map(() =>
				this.channel.bindQueue(
					`${queue}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`,
					`${exchangeName}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`,
					queue
				)
			)
		]);
	}

	private async declareExchange(exchange: string): Promise<void> {
		await this.channel.assertExchange(exchange, 'topic', {
			durable: true,
			autoDelete: false
		});
	}

	private async publishMessage(
		exchange: string,
		routingKey: string,
		messageId: string,
		data: string
	): Promise<void> {
		return new Promise((resolve, reject) => {
			this.channel.publish(
				exchange,
				routingKey,
				Buffer.from(data),
				{ ...this.amqpChannelPublishOptions, messageId },
				err => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				}
			);
		});
	}

	private async createConnection(): Promise<amqplib.Connection> {
		try {
			const connection = await amqplib.connect(this.amqpConnectionSettings);
			connection.on('error', err => console.error('Error en la conexión:', err));
			connection.on('close', () => console.warn('La conexión a RabbitMQ se cerró.'));

			return connection;
		} catch (err) {
			console.error('Error al crear la conexión:', err);
			throw err;
		}
	}

	private async createChannel(connection: amqplib.Connection): Promise<amqplib.ConfirmChannel> {
		try {
			const channel = await connection.createConfirmChannel();
			await channel.prefetch(1);
			channel.on('error', err => console.error('Error en el canal:', err));
			channel.on('close', () => console.warn('El canal se cerró.'));

			return channel;
		} catch (err) {
			console.error('Error al crear el canal:', err);
			throw err;
		}
	}
}
