import CreateImageCommand from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import { ImageCreatedDomainEvent } from '../../application/save/ImageCreatedDomainEvent';
import { Image } from '../Image';
import { ImageRepository } from '../ImageRepository';

export class DomainImageSaver {
	static save(imageRepository: ImageRepository, eventBus: EventBus) {
		return async (command: CreateImageCommand): Promise<void> => {
			const { id, path } = command;
			const image = Image.create({ id, path });
			await imageRepository.save(image);

			await eventBus.publish(
				ImageCreatedDomainEvent.fromPrimitives({
					aggregateId: image.getId(),
					attributes: {
						path: image.getPath()
					}
				})
			);

			return Promise.resolve();
		};
	}
}
