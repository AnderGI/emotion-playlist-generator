import * as amqplib from 'amqplib';

import { DomainEvent } from '../../../contexts/shared/domain/event/DomainEvent';
import { EventBus } from '../../../contexts/shared/domain/event/EventBus';
import { DomainEventSubscribers } from '../../../contexts/shared/infrastructure/event/DomainEventSubscribers';

export class RabbitMqEventBus implements EventBus {
	// constructor() {}
	async publish(event: DomainEvent): Promise<void> {
		const connection = await this.createConnection();
		const channel = await this.createChannel(connection);
		await channel.prefetch(1);

		return new Promise((resolve, reject) => {
			channel.publish(
				'amq.topic',
				event.eventName, // andergi.backoffice.image.event.image_created.1
				Buffer.from(
					JSON.stringify({
						aggregateId: event.eventId,
						eventId: event.aggregateId,
						occurredOn: event.occurredOn,
						eventName: event.eventName,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						attributes: event.toPrimitives()
					})
				),
				{
					contentType: 'application/json',
					contentEncoding: 'utf-8',
					messageId: event.eventId
				},
				err => {
					if (err) {
						reject(err);
					}
					resolve();
				}
			);
		});
	}

	addSubscribers(subscribers: DomainEventSubscribers): void {
		throw new Error('Method not implemented.');
	}

	private async createConnection() {
		const connection = await amqplib.connect({
			protocol: 'amqp',
			hostname: 'localhost',
			port: 5672,
			username: 'admin',
			password: 'p@ssw0rd',
			vhost: '/'
		});
		connection.on('error', err => {
			console.log(err);
			process.exit(1);
		});

		return connection;
	}

	private async createChannel(connection: amqplib.Connection) {
		const channel = await connection.createConfirmChannel();
		channel.on('error', err => {
			console.log(err);
			process.exit(1);
		});

		return channel;
	}
}
