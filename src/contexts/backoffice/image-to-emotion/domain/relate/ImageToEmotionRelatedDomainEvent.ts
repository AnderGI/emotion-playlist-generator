import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type ImageToEmotionRelatedDomainEventAttributes = {
	filename: string;
};

export default class ImageToEmotionRelatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string =
		'andergi.backoffice.image-to-emotion.event.image_related_to_emotion.1';

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
		super({
			eventName: ImageToEmotionRelatedDomainEvent.EVENT_NAME,
			aggregateId,
			eventId,
			occurredOn
		});
		this.filename = filename;
	}

	static fromPrimitives(params: {
		aggregateId: string;
		attributes: ImageToEmotionRelatedDomainEventAttributes;
		eventId?: string;
		occurredOn?: Date;
	}): ImageToEmotionRelatedDomainEvent {
		const { aggregateId, attributes, occurredOn, eventId } = params;

		return new ImageToEmotionRelatedDomainEvent({
			aggregateId,
			filename: attributes.filename,
			eventId,
			occurredOn
		});
	}

	toPrimitives(): ImageToEmotionRelatedDomainEventAttributes {
		const { filename } = this;

		return {
			filename
		};
	}
}
