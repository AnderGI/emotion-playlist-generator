import CreateImageCommand from '../../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import CreateImageCommandHandler from '../../../../../src/contexts/backoffice/image/application/save/CreateImageCommandHandler';
import { ImageCreatedDomainEvent } from '../../../../../src/contexts/backoffice/image/application/save/ImageCreatedDomainEvent';
import { ImageSaver } from '../../../../../src/contexts/backoffice/image/application/save/ImageSaver';
import { Image } from '../../../../../src/contexts/backoffice/image/domain/Image';
import { MockEventBus } from '../../__mocks__/MockEventBus';
import { MockImageRepository } from '../../__mocks__/MockImageRepository';
import { CreateImageCommandMother } from '../../domain/CreateImageCommandMother';
import { ImageCreatedDomainEventMother } from '../../domain/ImageCreatedDomainEventMother';
import { ImageMother } from '../../domain/ImageMother';

export default class CreateImageUseCaseArrenger {
	private readonly imageRepository: MockImageRepository;
	private readonly eventBus: MockEventBus;
	private readonly imageSaver: ImageSaver;
	private readonly handler: CreateImageCommandHandler;

	private constructor() {
		this.imageRepository = new MockImageRepository();
		this.eventBus = new MockEventBus();
		this.imageSaver = new ImageSaver(this.imageRepository, this.eventBus);
		this.handler = new CreateImageCommandHandler(this.imageSaver);
	}

	public static create(): CreateImageUseCaseArrenger {
		return new CreateImageUseCaseArrenger();
	}

	public async executeHappyPath(): Promise<void> {
		const command = this.createCommand();
		const image = this.createImageFromCommand(command);
		const event = this.createImageCreatedEvent(image);

		await this.handler.handle(command);

		this.imageRepository.assertSaveHasBeenCalledWith(image);
		this.eventBus.assertBusHasBeenCalledWith(event);
	}

	private createCommand(): CreateImageCommand {
		return CreateImageCommandMother.random();
	}

	private createImageFromCommand(command: CreateImageCommand): Image {
		return ImageMother.fromCommand(command);
	}

	private createImageCreatedEvent(image: Image): ImageCreatedDomainEvent {
		return ImageCreatedDomainEventMother.create(image);
	}
}
