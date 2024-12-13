import CreateImageCommand from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import { ImageCreatedDomainEvent } from '../../application/save/ImageCreatedDomainEvent';
import { Image } from '../Image';
import { ImageRepository } from '../ImageRepository';

export class DomainImageSaver {
	static save(imageRepository: ImageRepository, eventBus: EventBus) {
		return async (command: CreateImageCommand): Promise<void> => {
			const { id, filename } = command;
			const image = Image.create({ id, filename });
			await imageRepository.save(image);
			await eventBus.publish(
				ImageCreatedDomainEvent.fromPrimitives({
					aggregateId: image.getId(),
					attributes: {
						filename: image.getFilename()
					}
				})
			);

			return Promise.resolve();
		};
	}
}
