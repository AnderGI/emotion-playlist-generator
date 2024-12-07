import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type ImageCreatedDomainEventAttributes = {
	readonly path: string;
};

export class ImageCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string = 'andergi.backoffice.image.event.image_created.1';

	readonly path: string;

	constructor({
		aggregateId,
		path,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		path: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		super({ eventName: ImageCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
		this.path = path;
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
			path: attributes.path,
			eventId,
			occurredOn
		});
	}

	toPrimitives(): ImageCreatedDomainEventAttributes {
		const { path } = this;

		return {
			path
		};
	}
}
