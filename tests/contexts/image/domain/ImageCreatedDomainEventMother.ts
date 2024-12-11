import { ImageCreatedDomainEvent } from '../../../../src/contexts/backoffice/image/application/save/ImageCreatedDomainEvent';
import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';

export class ImageCreatedDomainEventMother {
	static create(image: Image): ImageCreatedDomainEvent {
		return ImageCreatedDomainEvent.fromPrimitives({
			aggregateId: image.getId(),
			attributes: {
				path: image.getPath()
			}
		});
	}
}
