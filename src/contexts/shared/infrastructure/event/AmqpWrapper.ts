import * as amqplib from 'amqplib';

import { AmqpChannelPublishOptions } from './AmqpChannelPublishOptionsFactory';
import { AmqpConnectionSettings } from './AmqpConnectionSettingsFactory';

export class AmqpWrapper {
	private connection?: amqplib.Connection;
	private channel?: amqplib.ConfirmChannel;
	private readonly retrySuffix = 'retry';
	private readonly deadLetterSuffix = 'dead_letter';
	constructor(
		private readonly amqpConnectionSettings: AmqpConnectionSettings,
		private readonly amqpChannelPublishOptions: AmqpChannelPublishOptions
	) {}

	/**
	 * Establece una conexión y un canal a RabbitMQ.
	 * Evita reconexiones si ya existe una activa.
	 */
	async connect(): Promise<void> {
		if (this.connection && this.channel) {
			console.log('Conexión y canal ya están activos.');

			return;
		}

		try {
			this.connection = await this.createConnection();
			this.channel = await this.createChannel(this.connection);
			console.log('Conexión y canal establecidos exitosamente.');
		} catch (err) {
			console.error('Error al conectar con RabbitMQ:', err);
			await this.close();
			throw err;
		}
	}

	/**
	 * Publica un mensaje en un exchange de RabbitMQ.
	 * Lanza un error si no hay un canal activo.
	 *
	 * @param params Objeto con exchange, routingKey, messageId y datos del mensaje.
	 */
	async publish(params: {
		exchange: string;
		routingKey: string;
		messageId: string;
		data: string;
	}): Promise<void> {
		this.ensureChannelAvailable();

		const { exchange, routingKey, messageId, data } = params;

		try {
			await this.publishMessage(exchange, routingKey, messageId, data);
			console.log(`Mensaje publicado en el exchange '${exchange}' con routingKey '${routingKey}'.`);
		} catch (err) {
			console.error('Error al publicar el mensaje:', err);
			throw err;
		}
	}

	/**
	 * Cierra la conexión y el canal, liberando recursos.
	 */
	async close(): Promise<void> {
		try {
			if (this.channel) {
				await this.channel.close();
				console.log('Canal cerrado.');
			}
			if (this.connection) {
				await this.connection.close();
				console.log('Conexión cerrada.');
			}
		} catch (err) {
			console.error('Error al cerrar la conexión o el canal:', err);
		} finally {
			this.connection = undefined;
			this.channel = undefined;
		}
	}

	async declareExchanges(exchange: string): Promise<void> {
		await Promise.all([
			this.declareExchange(exchange),
			this.declareExchange(`${exchange}.${this.retrySuffix}`),
			this.declareExchange(`${exchange}.${this.deadLetterSuffix}`)
		]);
	}

	async createQueues(
		exchangeName: string,
		queueToBindings: { queue: string; bindings: string[] }
	): Promise<void> {
		const { queue, bindings } = queueToBindings;
		await Promise.all([
			this.setupBaseQueue(exchangeName, queue, bindings),
			this.setupRetryQueue(exchangeName, queue, bindings),
			this.setupDeadLetterQueue(exchangeName, queue, bindings)
		]);
	}

	private async setupBaseQueue(exchangeName: string, queue: string, bindings: string[]) {
		// Base queue
		await this.channel?.assertQueue(queue, {
			durable: true,
			autoDelete: false,
			exclusive: false
		});
		await Promise.all([
			...bindings.map(binding => this.channel?.bindQueue(queue, exchangeName, binding)),
			this.channel?.bindQueue(queue, exchangeName, queue)
		]);
	}

	private async setupRetryQueue(exchangeName: string, queue: string, bindings: string[]) {
		// Retry queue
		await this.channel?.assertQueue(`${queue}.${this.retrySuffix}`, {
			durable: true,
			autoDelete: false,
			exclusive: false,
			messageTtl: 5000,
			deadLetterExchange: exchangeName,
			deadLetterRoutingKey: queue
		});
		await Promise.all([
			...bindings.map(binding =>
				this.channel?.bindQueue(
					`${queue}.${this.retrySuffix}`,
					`${exchangeName}.${this.retrySuffix}`,
					binding
				)
			)
		]);
	}

	private async setupDeadLetterQueue(exchangeName: string, queue: string, bindings: string[]) {
		// DL queue
		await this.channel?.assertQueue(`${queue}.${this.deadLetterSuffix}`, {
			durable: true,
			autoDelete: false,
			exclusive: false
		});
		await Promise.all([
			...bindings.map(binding =>
				this.channel?.bindQueue(
					`${queue}.${this.deadLetterSuffix}`,
					`${exchangeName}.${this.deadLetterSuffix}`,
					binding
				)
			)
		]);
	}

	/**
	 *
	 * @param exchange Name of the exchange to which domain events will be published
	 * Base, Retry and Dead Letter exchange will be created
	 */
	private async declareExchange(exchange: string): Promise<void> {
		await this.channel?.assertExchange(exchange, 'topic', {
			durable: true,
			autoDelete: false
		});
	}

	/**
	 * Verifica si el canal está disponible, lanzando un error si no lo está.
	 */
	private ensureChannelAvailable(): void {
		if (!this.channel) {
			throw new Error(
				'El canal no está disponible. Asegúrate de llamar a connect() antes de publicar.'
			);
		}
	}

	/**
	 * Publica un mensaje en el canal configurado.
	 *
	 * @param exchange Nombre del exchange.
	 * @param routingKey Clave de enrutamiento.
	 * @param messageId ID del mensaje.
	 * @param data Datos del mensaje en formato string.
	 */
	private async publishMessage(
		exchange: string,
		routingKey: string,
		messageId: string,
		data: string
	): Promise<void> {
		return new Promise((resolve, reject) => {
			this.channel?.publish(
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

	/**
	 * Crea una conexión a RabbitMQ con eventos manejados.
	 */
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

	/**
	 * Crea un canal de confirmación y configura prefetch.
	 */
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
