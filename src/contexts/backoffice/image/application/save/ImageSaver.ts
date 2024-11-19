import CreateImageCommand from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { EventBus } from '../../../../../shared/domain/bus/event/EventBus';
import { ImageRepository } from '../../domain/ImageRepository';
import { DomainImageSaver } from '../../domain/save/DomainImageSaver';

export class ImageSaver {
	constructor(
		private readonly imageRepository: ImageRepository,
		private readonly eventBus: EventBus
	) {}

	public async save(command: CreateImageCommand): Promise<void> {
		return DomainImageSaver.save(this.imageRepository, this.eventBus)(command);
	}
}
