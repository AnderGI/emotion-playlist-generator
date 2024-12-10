import { DomainEvent } from '../../domain/event/DomainEvent';
import { EventBus } from '../../domain/event/EventBus';
import { AmqpWrapper } from './AmqpWrapper';
import DomainEventJsonSerializer from './DomainEventJsonSerializer';
import { DomainEventsFallback } from './DomainEventsFallback';
import { DomainEventSubscribers } from './DomainEventSubscribers';

export class RabbitMqEventBus implements EventBus {
	private readonly exchange: string;

	constructor(
		private readonly amqpWrapper: AmqpWrapper,
		private readonly domainEventsFallback: DomainEventsFallback,
		private readonly domainEventJsonSerializer: DomainEventJsonSerializer
	) {
		this.exchange = 'domain_events';
	}

	async publish(event: DomainEvent): Promise<void> {
		try {
			await this.amqpWrapper.publish({
				exchange: this.exchange,
				routingKey: event.eventName,
				messageId: event.eventId,
				data: this.serialize(event)
			});
		} catch (err) {
			console.log(err);
			await this.domainEventsFallback.fallback(event);
		}
	}

	addSubscribers(subscribers: DomainEventSubscribers): void {
		throw new Error('Method not implemented.');
	}

	private serialize(event: DomainEvent): string {
		return this.domainEventJsonSerializer.serialize(event);
	}
}
