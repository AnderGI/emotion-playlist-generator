import * as amqplib from 'amqplib';
import { Buffer } from 'buffer';

import { AmqpChannelPublishOptions } from '../../contexts/shared/infrastructure/event/AmqpChannelPublishOptionsFactory';
import { AmqpConnectionSettings } from '../../contexts/shared/infrastructure/event/AmqpConnectionSettingsFactory';

export default class RabbitMqPublishingErrorHandler {
	private connection!: amqplib.Connection;
	private channel!: amqplib.ConfirmChannel;

	constructor(
		private readonly amqpConnectionSettings: AmqpConnectionSettings,
		private readonly amqpChannelPublishOptions: AmqpChannelPublishOptions
	) {}

	async handleRetry(message: amqplib.ConsumeMessage, queueName: string): Promise<void> {
		try {
			const redeliveryCount = this.getRedeliveryCount(message);
			if (redeliveryCount < 3) {
				// Incrementa el redelivery_count y republica en la cola de reintentos
				await this.publishToRetry(message, queueName);
			} else {
				// Publica en la Dead Letter Queue después de 3 intentos
				await this.publishToDeadLetter(message, queueName);
			}
		} catch (err) {
			console.error('Error al manejar el reintento o mover a Dead Letter Queue:', err);
		} finally {
			await this.close();
		}
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

	/**
	 * Cierra la conexión y el canal, liberando recursos.
	 */
	async close(): Promise<void> {
		await this.channel.close();
		await this.connection.close();
	}

	private async publishToRetry(message: amqplib.ConsumeMessage, queueName: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.channel.publish(
				'domain_events.retry',
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
				'domain_events.dead_letter',
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

	private getRedeliveryCount(message: amqplib.ConsumeMessage): number {
		console.log(message);
		if (!message.properties.headers) {
			message.properties.headers = {}; // Inicializar headers si no existe
		}
		if (!message.properties.headers.redelivery_count) {
			message.properties.headers.redelivery_count = 1;
		} else {
			message.properties.headers.redelivery_count += 1;
		}

		const count = message.properties.headers.redelivery_count as number;

		return count;
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
