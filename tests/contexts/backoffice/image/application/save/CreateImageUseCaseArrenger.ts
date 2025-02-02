import SubmitImageCommand from '../../../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { ImageSaver } from '../../../../../../src/contexts/backoffice/image/application/submit/ImageSaver';
import { ImageSubmitedDomainEvent } from '../../../../../../src/contexts/backoffice/image/application/submit/ImageSubmitedDomainEvent';
import SubmitImageCommandHandler from '../../../../../../src/contexts/backoffice/image/application/submit/SubmitImageCommandHandler';
import { Image } from '../../../../../../src/contexts/backoffice/image/domain/Image';
import { ImageMockEventBus } from '../../__mock__/ImageMockEventBus';
import { MockImageRepository } from '../../__mock__/MockImageRepository';
import { CreateImageCommandMother } from '../../domain/CreateImageCommandMother';
import { ImageCreatedDomainEventMother } from '../../domain/ImageCreatedDomainEventMother';
import { ImageMother } from '../../domain/ImageMother';

export default class CreateImageUseCaseArrenger {
	private readonly imageRepository: MockImageRepository;
	private readonly eventBus: ImageMockEventBus;
	private readonly imageSaver: ImageSaver;
	private readonly handler: SubmitImageCommandHandler;

	private constructor() {
		this.imageRepository = new MockImageRepository();
		this.eventBus = new ImageMockEventBus();
		this.imageSaver = new ImageSaver(this.imageRepository, this.eventBus);
		this.handler = new SubmitImageCommandHandler(this.imageSaver);
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

	private createCommand(): SubmitImageCommand {
		return CreateImageCommandMother.random();
	}

	private createImageFromCommand(command: SubmitImageCommand): Image {
		return ImageMother.fromCommand(command);
	}

	private createImageCreatedEvent(image: Image): ImageSubmitedDomainEvent {
		return ImageCreatedDomainEventMother.create(image);
	}
}
