import { DomainEvent } from '../../domain/event/DomainEvent';

export default class DomainEventJsonSerializer {
	serialize(event: DomainEvent): string {
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