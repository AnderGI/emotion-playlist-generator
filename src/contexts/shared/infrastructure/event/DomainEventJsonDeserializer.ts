import container from '../../../../apps/backoffice/backend/dependency-injection';
import { DomainEvent, DomainEventClass } from '../../domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../domain/event/DomainEventSubscriber';

type EventMapping = Map<string, DomainEventClass>;

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
		const subscriberIds = [...container.findTaggedServiceIds('subscriber').keys()];
		const eventMapping: Map<string, DomainEventClass> = new Map();
		subscriberIds.forEach(subscriberId => {
			const subscriber = container.get<DomainEventSubscriber<DomainEvent>>(subscriberId as string);
			subscriber.subscribedTo().forEach(event => {
				eventMapping.set(event.EVENT_NAME, event);
			});
		});

		return new DomainEventJsonDeserializer(eventMapping);
	}

	deserialize(content: string): DomainEvent {
		const jsonStringDomainEvent = JSON.parse(content) as JsonStringDomainEvent;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { aggregateId, eventId, occurredOn, attributes, eventName } = jsonStringDomainEvent;
		const DomainEventClass = this.eventMapping.get(eventName);
		if (!DomainEventClass) {
			throw new Error(`DomainEventClass not found for ${eventName}`);
		}

		return DomainEventClass.fromPrimitives({
			aggregateId,
			eventId,
			occurredOn: new Date(occurredOn),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			attributes
		});
	}
}
