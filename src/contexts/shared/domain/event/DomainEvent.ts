import { UuidValueObject } from '../value-object/UuidValueObject';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DomainEventAttributes = any;
type FromReceivedData = {
	eventName: string;
	aggregateId: string;
	eventId: string;
	occurredOn: string;
	attributes: any;
};

export abstract class DomainEvent {
	static EVENT_NAME: string;

	readonly aggregateId: string;
	readonly eventId: string;
	readonly occurredOn: Date;
	readonly eventName: string;

	constructor(params: {
		eventName: string;
		aggregateId: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		const { aggregateId, eventName, eventId, occurredOn } = params;

		this.aggregateId = aggregateId;
		this.eventId = eventId ?? UuidValueObject.random();
		this.occurredOn = occurredOn ?? new Date();
		this.eventName = eventName;
	}

	abstract toPrimitives(): DomainEventAttributes;
	abstract fromReceivedData(data: FromReceivedData): DomainEvent;
	abstract getEventName(): string;
}

export type DomainEventClass = {
	EVENT_NAME: string;
	fromPrimitives(params: {
		aggregateId: string;
		eventId: string;
		occurredOn: Date;
		attributes: DomainEventAttributes;
	}): DomainEvent;
};

export type DomainEventClassName = {
	name: string;
};
