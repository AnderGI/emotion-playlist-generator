import SubmitImageCommand from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import { ImageCreatedDomainEvent } from '../../application/save/ImageCreatedDomainEvent';
import { Image } from '../Image';
import { ImageRepository } from '../ImageRepository';

export class DomainImageSaver {
	static save(imageRepository: ImageRepository, eventBus: EventBus) {
		return async (command: SubmitImageCommand): Promise<void> => {
			const { id, filename, mimetype, destination, size } = command.params;
			const image = Image.create({ id, mimetype, destination, filename, size });
			await imageRepository.save(image);
			await eventBus.publish(
				ImageCreatedDomainEvent.fromPrimitives({
					aggregateId: image.getId(),
					attributes: {
						filename: image.getFilename(),
						destination: image.getDestination()
					}
				})
			);

			return Promise.resolve();
		};
	}
}
