import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type ImageCreatedDomainEventAttributes = {
	readonly filename: string;
};

export class ImageCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string = 'andergi.backoffice.image.event.image_created.1';

	readonly filename: string;

	constructor({
		aggregateId,
		filename,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		filename: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		super({ eventName: ImageCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
		this.filename = filename;
	}

	static fromPrimitives(params: {
		aggregateId: string;
		attributes: ImageCreatedDomainEventAttributes;
		eventId?: string;
		occurredOn?: Date;
	}): ImageCreatedDomainEvent {
		const { aggregateId, attributes, occurredOn, eventId } = params;

		return new ImageCreatedDomainEvent({
			aggregateId,
			filename: attributes.filename,
			eventId,
			occurredOn
		});
	}

	toPrimitives(): ImageCreatedDomainEventAttributes {
		const { filename } = this;

		return {
			filename
		};
	}
}
