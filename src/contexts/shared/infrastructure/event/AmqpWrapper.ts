import * as amqplib from 'amqplib';

import { AmqpChannelPublishOptions } from './AmqpChannelPublishOptionsFactory';
import { AmqpConnectionSettings } from './AmqpConnectionSettingsFactory';
import { DomainEventSubscribers } from './DomainEventSubscribers';

export class AmqpWrapper {
	private connection!: amqplib.Connection;
	private channel!: amqplib.ConfirmChannel;

	constructor(
		private readonly amqpConnectionSettings: AmqpConnectionSettings,
		private readonly amqpChannelPublishOptions: AmqpChannelPublishOptions
	) {}

	async connect(): Promise<void> {
		this.connection = await this.createConnection();
		this.channel = await this.createChannel(this.connection);
	}

	async close(): Promise<void> {
		await this.channel.close();
		await this.connection.close();
	}

	async publish({
		exchange,
		routingKey,
		messageId,
		data
	}: {
		exchange: string;
		routingKey: string;
		messageId: string;
		data: string;
	}): Promise<void> {
		await this.connect();

		await new Promise((resolve, reject) => {
			this.channel.publish(
				exchange,
				routingKey,
				Buffer.from(data),
				{ ...this.amqpChannelPublishOptions, messageId },
				(err, ok) => {
					if (err) {
						reject(err);
					}
					resolve(ok);
				}
			);
		});

		await this.close();
	}

	addSubscribers(subscribers: DomainEventSubscribers): void {
		throw new Error('Method not implemented.');
	}

	private async createConnection() {
		const connection = await amqplib.connect(this.amqpConnectionSettings);
		connection.on('error', err => {
			console.log(err);
			process.exit(1);
		});

		return connection;
	}

	private async createChannel(connection: amqplib.Connection): Promise<amqplib.ConfirmChannel> {
		const channel = await connection.createConfirmChannel();
		await channel.prefetch(1);
		channel.on('error', err => {
			console.log(err);
			process.exit(1);
		});

		return channel;
	}
}
