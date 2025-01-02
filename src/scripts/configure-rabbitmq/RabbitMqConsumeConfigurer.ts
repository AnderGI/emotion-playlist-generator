import * as amqplib from 'amqplib';

import { DomainEvent } from '../../contexts/shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../contexts/shared/domain/event/DomainEventSubscriber';
import { AmqpConnectionSettings } from '../../contexts/shared/infrastructure/event/AmqpConnectionSettingsFactory';
import DomainEventJsonDeserializer from '../../contexts/shared/infrastructure/event/DomainEventJsonDeserializer';
import RabbitMqPublishingErrorHandler from './RabbitMqPublishingErrorHandler';

type QueueToSubscriber = { queue: string; subscriber: DomainEventSubscriber<DomainEvent> };

export default class RabbitMqConsumeConfigurer {
	private connection!: amqplib.Connection;
	private channel!: amqplib.ConfirmChannel;

	constructor(
		private readonly amqpConnectionSettings: AmqpConnectionSettings,
		private readonly domainEventJsonDeserializer: DomainEventJsonDeserializer,
		private readonly rabbitMqPublishingErrorHandler: RabbitMqPublishingErrorHandler
	) {}

	async consume(queuesToSubscriber: QueueToSubscriber[]): Promise<void> {
		await Promise.all(
			queuesToSubscriber.map(queueToBinding =>
				this.channel.consume(
					queueToBinding.queue,
					this._consume(
						queueToBinding.subscriber,
						this.channel,
						this.domainEventJsonDeserializer,
						this.rabbitMqPublishingErrorHandler
					)
				)
			)
		);
	}

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

	private async close(): Promise<void> {
		await this.channel.close();
		await this.connection.close();
	}

	private _consume(
		subscriber: DomainEventSubscriber<DomainEvent>,
		channel: amqplib.ConfirmChannel
	) {
		return (msg: amqplib.ConsumeMessage | null) => {
			if (msg !== null) {
				subscriber
					.on(this.domainEventJsonDeserializer.deserialize(msg.content.toString()))
					.catch(() => {
						console.log('-- retry');
						this.rabbitMqPublishingErrorHandler.handleRetry(msg, subscriber.queueName());
					})
					.finally(() => {
						channel.ack(msg);
					});
			}
		};
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
