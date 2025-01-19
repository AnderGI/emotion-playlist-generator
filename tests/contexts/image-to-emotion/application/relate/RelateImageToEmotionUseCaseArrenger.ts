import { ImageFilename } from '../../../../../src/contexts/backoffice/image/domain/ImageFilename';
import ImageToEmotionGenerator from '../../../../../src/contexts/backoffice/image-to-emotion/application/relate/ImageToEmotionGenerator';
import { RelateImageToEmotionOnImageSubmited } from '../../../../../src/contexts/backoffice/image-to-emotion/application/relate/RelateImageToEmotionOnImageSubmited';
import ImageToEmotion from '../../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotion';
import { ImageCreatedDomainEventMother } from '../../../image/domain/ImageCreatedDomainEventMother';
import ImageToEmotionMockEventBus from '../../__mocks__/ImageToEmotionMockEventBus';
import MockImageToEmotionRelator from '../../__mocks__/MockImageToEmotionRelator';
import { EmotioNameMother } from '../../domain/EmotioNameMother';
import { ImageToEmotionRelatedDomainEventMother } from '../../domain/ImageToEmotionRelatedDomainEventMother';

export default class RelateImageToEmotionUseCaseArrenger {
	private readonly imageToEmotionRelator: MockImageToEmotionRelator;
	private readonly eventBus: ImageToEmotionMockEventBus;
	private readonly EMOTION: string;
	private readonly imageToEmotionGenerator: ImageToEmotionGenerator;
	private readonly relateImageToEmotionOnImageCreated: RelateImageToEmotionOnImageSubmited;

	private constructor() {
		this.EMOTION = EmotioNameMother.random();
		this.imageToEmotionRelator = new MockImageToEmotionRelator(this.EMOTION);
		this.eventBus = new ImageToEmotionMockEventBus();
		this.imageToEmotionGenerator = new ImageToEmotionGenerator(
			this.imageToEmotionRelator,
			this.eventBus
		);
		this.relateImageToEmotionOnImageCreated = new RelateImageToEmotionOnImageSubmited(
			this.imageToEmotionGenerator
		);
	}

	public static create(): RelateImageToEmotionUseCaseArrenger {
		return new RelateImageToEmotionUseCaseArrenger();
	}

	public async executeHappyPath(): Promise<void> {
		const imageCreatedDomainEvent = ImageCreatedDomainEventMother.fromRandomImage();
		const imageToEmotionRelatedDomainEvent = ImageToEmotionRelatedDomainEventMother.create({
			emotion: this.EMOTION,
			filename: imageCreatedDomainEvent.filename
		});

		await this.relateImageToEmotionOnImageCreated.on(imageCreatedDomainEvent);

		this.imageToEmotionRelator.assertRelateHasBeenCalledWith(
			new ImageToEmotion(ImageFilename.create(imageCreatedDomainEvent.filename))
		);

		this.eventBus.assertBusHasBeenCalledWith(imageToEmotionRelatedDomainEvent);
	}
}
