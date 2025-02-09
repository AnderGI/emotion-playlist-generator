import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type ImageSubmitedDomainEventAttributes = {
	readonly filename: string;
	readonly dirname: string;
};

export class ImageSubmitedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string = 'andergi.backoffice.image.event.image_submited.1';

	readonly filename: string;
	readonly dirname: string;

	constructor({
		aggregateId,
		filename,
		dirname,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		filename: string;
		dirname: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		super({ eventName: ImageSubmitedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
		this.filename = filename;
		this.dirname = dirname;
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
			dirname: attributes.dirname,
			eventId,
			occurredOn
		});
	}

	toPrimitives(): ImageSubmitedDomainEventAttributes {
		const { filename, dirname } = this;

		return {
			filename,
			dirname
		};
	}

	getEventName(): string {
		return ImageSubmitedDomainEvent.EVENT_NAME;
	}
}
