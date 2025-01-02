import * as amqplib from 'amqplib';

import { AmqpConnectionSettings } from '../../contexts/shared/infrastructure/event/AmqpConnectionSettingsFactory';

const EXCHANGE_BASE_OPTIONS: amqplib.Options.AssertExchange = {
	durable: true,
	autoDelete: false
};

const QUEUE_BASE_OPTIONS: amqplib.Options.AssertQueue = {
	durable: true,
	autoDelete: false,
	exclusive: false
};

const QUEUE_RETRY_OPTIONS = (exchangeName: string, queue: string): amqplib.Options.AssertQueue => ({
	...QUEUE_BASE_OPTIONS,
	messageTtl: 5000,
	deadLetterExchange: exchangeName,
	deadLetterRoutingKey: queue
});

export default class RabbitMqSetupConfigurer {
	private connection?: amqplib.Connection;
	private channel?: amqplib.ConfirmChannel;
	private readonly retrySuffix = 'retry';
	private readonly deadLetterSuffix = 'dead_letter';

	constructor(private readonly amqpConnectionSettings: AmqpConnectionSettings) {}

	async connect(): Promise<void> {
		if (this.connection && this.channel) {
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

	async close(): Promise<void> {
		try {
			if (this.channel) {
				await this.channel.close();
			}
			if (this.connection) {
				await this.connection.close();
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
		console.log(queueToBindings);
		const { queue, bindings } = queueToBindings;
		await Promise.all([
			this.setupBaseQueue(exchangeName, queue, bindings),
			this.setupRetryQueue(exchangeName, queue, bindings),
			this.setupDeadLetterQueue(exchangeName, queue, bindings)
		]);
	}

	private async setupBaseQueue(exchangeName: string, queue: string, bindings: string[]) {
		// Base queue
		await this.channel?.assertQueue(queue, QUEUE_BASE_OPTIONS);
		await Promise.all([
			...bindings.map(binding => this.channel?.bindQueue(queue, exchangeName, binding)),
			this.channel?.bindQueue(queue, exchangeName, queue)
		]);
	}

	private async setupRetryQueue(exchangeName: string, queue: string, bindings: string[]) {
		// Retry queue
		await this.channel?.assertQueue(
			`${queue}.${this.retrySuffix}`,
			QUEUE_RETRY_OPTIONS(exchangeName, queue)
		);
		await Promise.all([
			...bindings.map(() =>
				this.channel?.bindQueue(
					`${queue}.${this.retrySuffix}`,
					`${exchangeName}.${this.retrySuffix}`,
					queue
				)
			)
		]);
	}

	private async setupDeadLetterQueue(exchangeName: string, queue: string, bindings: string[]) {
		// DL queue
		await this.channel?.assertQueue(`${queue}.${this.deadLetterSuffix}`, QUEUE_BASE_OPTIONS);
		await Promise.all([
			...bindings.map(() =>
				this.channel?.bindQueue(
					`${queue}.${this.deadLetterSuffix}`,
					`${exchangeName}.${this.deadLetterSuffix}`,
					queue
				)
			)
		]);
	}

	private async declareExchange(exchange: string): Promise<void> {
		await this.channel?.assertExchange(exchange, 'topic', EXCHANGE_BASE_OPTIONS);
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
