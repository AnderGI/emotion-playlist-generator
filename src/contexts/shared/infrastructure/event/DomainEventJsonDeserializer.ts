import container from '../../../../apps/backoffice/backend/dependency-injection';
import { DomainEvent } from '../../domain/event/DomainEvent';

type EventMapping = Map<string, DomainEvent>;

type JsonStringDomainEvent = {
	eventName: string;
	aggregateId: string;
	eventId: string;
	occurredOn: string;
	attributes: any;
};

export default class DomainEventJsonDeserializer {
	private constructor(private readonly eventMapping: EventMapping) {}
	public static create(): DomainEventJsonDeserializer {
		const domainEventIds = [...container.findTaggedServiceIds('domainEvent').keys()];
		const eventMapping: Map<string, DomainEvent> = new Map();

		domainEventIds.forEach(domainEventId => {
			const event = container.get<DomainEvent>(domainEventId as string);
			eventMapping.set(event.getEventName(), event);
		});

		return new DomainEventJsonDeserializer(eventMapping);
	}

	deserialize(content: string): DomainEvent {
		// 	logger.warn('content');
		// 	console.log(content);
		const jsonStringDomainEvent = JSON.parse(content) as JsonStringDomainEvent;
		console.log(jsonStringDomainEvent);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const event = this.eventMapping.get(jsonStringDomainEvent.eventName) as DomainEvent;
		console.log(event);
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!event) {
			throw new Error();
		}
		console.log(event.fromReceivedData(jsonStringDomainEvent).occurredOn);

		// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		// 	const { aggregateId, eventId, occurredOn, attributes, eventName } = jsonStringDomainEvent;
		// 	const event = this.eventMapping.get(eventName);
		// 	if (!event) {
		// 		throw new Error(`DomainEventClass not found for ${eventName}`);
		// 	}
		// 	return event.fromPrimitives({
		// 		aggregateId,
		// 		eventId,
		// 		occurredOn: new Date(occurredOn),
		// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		// 		attributes
		// 	});
		return event.fromReceivedData(jsonStringDomainEvent);
	}
}
