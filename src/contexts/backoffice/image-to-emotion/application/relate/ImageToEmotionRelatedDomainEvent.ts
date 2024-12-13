import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type ImageToEmotionRelatedDomainEventAttributes = {
	emotion: string;
};

export default class ImageToEmotionRelatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string =
		'andergi.backoffice.image-to-emotion.event.image_related_to_emotion.1';

	readonly emotion: string;

	constructor({
		aggregateId,
		emotion,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		emotion: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		super({
			eventName: ImageToEmotionRelatedDomainEvent.EVENT_NAME,
			aggregateId,
			eventId,
			occurredOn
		});
		this.emotion = emotion;
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
			emotion: attributes.emotion,
			eventId,
			occurredOn
		});
	}

	toPrimitives(): ImageToEmotionRelatedDomainEventAttributes {
		const { emotion } = this;

		return {
			emotion
		};
	}
}
