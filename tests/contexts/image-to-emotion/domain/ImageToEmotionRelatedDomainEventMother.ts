import ImageToEmotionRelatedDomainEvent from '../../../../src/contexts/backoffice/image-to-emotion/domain/relate/ImageToEmotionRelatedDomainEvent';

export class ImageToEmotionRelatedDomainEventMother {
	static create({
		emotion,
		filename
	}: {
		emotion: string;
		filename: string;
	}): ImageToEmotionRelatedDomainEvent {
		return new ImageToEmotionRelatedDomainEvent({ aggregateId: emotion, filename });
	}
}
