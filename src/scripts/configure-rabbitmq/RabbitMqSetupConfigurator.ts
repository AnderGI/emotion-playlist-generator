import * as amqplib from 'amqplib';

import { AmqpConnectionSettings } from '../../contexts/shared/infrastructure/event/AmqpConnectionSettingsFactory';

type QueueToBindings = {
	queue: string;
	bindings: string[];
};

/**
 * Configurator for RabbitMQ exchanges, queues, and bindings.
 */
export class RabbitMqSetupConfigurator {
	private connection?: amqplib.Connection;
	private channel?: amqplib.ConfirmChannel;

	constructor(private readonly amqpConnectionSettings: AmqpConnectionSettings) {}

	async setup(exchanges: string[], queueToBindings: QueueToBindings[]): Promise<void> {
		await this.connect();

		await this.createExchanges(exchanges);
		await this.createQueues(queueToBindings);
		//await this.createBindings(exchanges, queueToBindings);
		console.log(queueToBindings);
		await this.close();
	}

	private async connect(): Promise<void> {
		if (!this.connection) {
			this.connection = await this.createConnection();
		}
		if (!this.channel) {
			this.channel = await this.createChannel(this.connection);
		}
	}

	private async close(): Promise<void> {
		try {
			await this.channel?.close();
			await this.connection?.close();
		} catch (err) {
			console.error('Error closing RabbitMQ resources:', err);
		}
	}

	private async createExchanges(exchanges: string[]): Promise<void> {
		if (!this.channel) {
			throw new Error('Channel not initialized.');
		}

		await Promise.all(
			exchanges.map(name =>
				this.channel!.assertExchange(name, 'topic', {
					durable: true,
					autoDelete: false
				})
			)
		);
	}

	private async createQueues(queueToBindings: QueueToBindings[]): Promise<void> {
		if (!this.channel) {
			throw new Error('Channel not initialized.');
		}

		await Promise.all(
			queueToBindings.map(({ queue }) =>
				this.channel?.assertQueue(queue, {
					durable: true,
					exclusive: false,
					autoDelete: false // Adjust as needed
				})
			)
		);
	}

	// private async createBindings(
	// 	exchanges: string[],
	// 	queueToBindings: QueueToBindings[]
	// ): Promise<void> {
	// 	if (!this.channel) {
	// 		throw new Error('Channel not initialized.');
	// 	}

	// 	await Promise.all(
	// 		queueToBindings.map(({ queue, bindings }) =>
	// 			bindings.map(binding =>
	// 				exchanges.map(exchange => this.channel?.bindQueue(queue, exchange, binding))
	// 			)
	// 		)
	// 	);
	// }

	private async createConnection(): Promise<amqplib.Connection> {
		try {
			const connection = await amqplib.connect(this.amqpConnectionSettings);

			this.handleConnectionEvents(connection);

			return connection;
		} catch (err) {
			console.error('Error creating RabbitMQ connection:', err);
			throw err;
		}
	}

	private async createChannel(connection: amqplib.Connection): Promise<amqplib.ConfirmChannel> {
		try {
			const channel = await connection.createConfirmChannel();
			await channel.prefetch(1);

			this.handleChannelEvents(channel);

			return channel;
		} catch (err) {
			console.error('Error creating RabbitMQ channel:', err);
			throw err;
		}
	}

	private handleConnectionEvents(connection: amqplib.Connection): void {
		connection.on('error', err => {
			console.error('RabbitMQ connection error:', err);
		});

		connection.on('close', () => {
			console.warn('RabbitMQ connection closed.');
		});
	}

	private handleChannelEvents(channel: amqplib.ConfirmChannel): void {
		channel.on('error', err => {
			console.error('RabbitMQ channel error:', err);
		});

		channel.on('close', () => {
			console.warn('RabbitMQ channel closed.');
		});
	}
}
