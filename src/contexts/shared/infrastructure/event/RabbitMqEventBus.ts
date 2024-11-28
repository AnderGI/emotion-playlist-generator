import { DomainEvent } from '../../domain/event/DomainEvent';
import { EventBus } from '../../domain/event/EventBus';
import { AmqpWrapper } from './AmqpWrapper';
import { DomainEventSubscribers } from './DomainEventSubscribers';

export class RabbitMqEventBus implements EventBus {
	private readonly exchange: string;

	constructor(private readonly amqpWrapper: AmqpWrapper) {
		this.exchange = 'amq.topic';
	}

	async publish(event: DomainEvent): Promise<void> {
		await this.amqpWrapper.publish({
			exchange: this.exchange,
			routingKey: event.eventName,
			messageId: event.eventId,
			data: this.serialize(event)
		});
	}

	addSubscribers(subscribers: DomainEventSubscribers): void {
		throw new Error('Method not implemented.');
	}

	private serialize(event: DomainEvent): string {
		return JSON.stringify({
			aggregateId: event.eventId,
			eventId: event.aggregateId,
			occurredOn: event.occurredOn,
			eventName: event.eventName,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			attributes: event.toPrimitives()
		});
	}
}
