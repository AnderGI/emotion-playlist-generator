import { ImageSubmitedDomainEvent } from '../../../../../src/contexts/backoffice/image/application/submit/ImageSubmitedDomainEvent';
import { Image } from '../../../../../src/contexts/backoffice/image/domain/Image';
import { ImageMother } from './ImageMother';

export class ImageCreatedDomainEventMother {
	static create(image: Image): ImageSubmitedDomainEvent {
		return ImageSubmitedDomainEvent.fromPrimitives({
			aggregateId: image.getId(),
			attributes: {
				filename: image.getFilename(),
				dirname: image.getDirname()
			}
		});
	}

	static fromRandomImage(): ImageSubmitedDomainEvent {
		const image = ImageMother.random();

		return ImageCreatedDomainEventMother.create(image);
	}
}
