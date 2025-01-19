import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type ImageSubmitedDomainEventAttributes = {
	readonly filename: string;
	readonly destination: string;
};

export class ImageSubmitedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string = 'andergi.backoffice.image.event.image_submited.1';

	readonly filename: string;
	readonly destination: string;

	constructor({
		aggregateId,
		filename,
		destination,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		filename: string;
		destination: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		super({ eventName: ImageSubmitedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
		this.filename = filename;
		this.destination = destination;
	}

	static fromPrimitives(params: {
		aggregateId: string;
		attributes: ImageSubmitedDomainEventAttributes;
		eventId?: string;
		occurredOn?: Date;
	}): ImageSubmitedDomainEvent {
		const { aggregateId, attributes, occurredOn, eventId } = params;

		return new ImageSubmitedDomainEvent({
			aggregateId,
			filename: attributes.filename,
			destination: attributes.destination,
			eventId,
			occurredOn
		});
	}

	toPrimitives(): ImageSubmitedDomainEventAttributes {
		const { filename, destination } = this;

		return {
			filename,
			destination
		};
	}
}
