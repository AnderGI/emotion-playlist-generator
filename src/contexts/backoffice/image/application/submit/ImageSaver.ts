import SubmitImageCommand from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import { ImageRepository } from '../../domain/ImageRepository';
import { DomainImageSaver } from '../../domain/save/DomainImageSaver';

export class ImageSaver {
	constructor(
		private readonly imageRepository: ImageRepository,
		private readonly eventBus: EventBus
	) {}

	public async run(command: SubmitImageCommand): Promise<void> {
		console.log('imagesaver');

		return DomainImageSaver.save(this.imageRepository, this.eventBus)(command);
	}
}
