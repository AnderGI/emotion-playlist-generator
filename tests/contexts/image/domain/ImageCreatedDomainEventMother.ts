import { ImageCreatedDomainEvent } from '../../../../src/contexts/backoffice/image/application/save/ImageCreatedDomainEvent';
import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';
import { ImageMother } from './ImageMother';

export class ImageCreatedDomainEventMother {
	static create(image: Image): ImageCreatedDomainEvent {
		return ImageCreatedDomainEvent.fromPrimitives({
			aggregateId: image.getId(),
			attributes: {
				filename: image.getFilename(),
				destination: image.getDestination()
			}
		});
	}

	static fromRandomImage(): ImageCreatedDomainEvent {
		const image = ImageMother.random();

		return ImageCreatedDomainEventMother.create(image);
	}
}
