import SubmitImageCommand from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import { ImageSubmitedDomainEvent } from '../../application/submit/ImageSubmitedDomainEvent';
import { Image } from '../Image';
import { ImageRepository } from '../ImageRepository';

export class DomainImageSaver {
	static save(imageRepository: ImageRepository, eventBus: EventBus) {
		return async (command: SubmitImageCommand): Promise<void> => {
			const { id, filename, dirname } = command.params;
			const image = Image.create({ id, filename, dirname });
			await imageRepository.save(image);
			const event = ImageSubmitedDomainEvent.fromPrimitives({
				aggregateId: image.getId(),
				attributes: {
					filename: image.getFilename(),
					dirname: image.getDirname()
				}
			});
			await eventBus.publish(event);

			return Promise.resolve();
		};
	}
}
