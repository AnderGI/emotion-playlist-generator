import { ImageFilename } from '../../../../../src/contexts/backoffice/image/domain/ImageFilename';
import ImageToEmotionGenerator from '../../../../../src/contexts/backoffice/image-to-emotion/application/relate/ImageToEmotionRelator';
import { RelateImageToEmotionOnImageCreated } from '../../../../../src/contexts/backoffice/image-to-emotion/application/relate/RelateImageToEmotionOnImageCreated';
import ImageToEmotion from '../../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotion';
import { ImageCreatedDomainEventMother } from '../../../image/domain/ImageCreatedDomainEventMother';
import { ImageMother } from '../../../image/domain/ImageMother';
import MockImageToEmotionEventBus from '../../__mocks__/MockImageToEmotionEventBus';
import MockImageToEmotionRelator from '../../__mocks__/MockImageToEmotionRelator';

describe('ImageToEmotionRelator', () => {
	describe('#relate', () => {
		it('should search for valid emotions from image', async () => {
			const imageToEmotionRelator = new MockImageToEmotionRelator();
			const eventBus = new MockImageToEmotionEventBus();
			const imageToEmotionGenerator: ImageToEmotionGenerator = new ImageToEmotionGenerator(
				imageToEmotionRelator,
				eventBus
			);

			const image = ImageMother.random();
			const imageCreatedDomainEvent = ImageCreatedDomainEventMother.create(image);
			const consumer: RelateImageToEmotionOnImageCreated = new RelateImageToEmotionOnImageCreated(
				imageToEmotionGenerator
			);

			await consumer.on(imageCreatedDomainEvent);

			imageToEmotionRelator.assertRelateHasBeenCalledWith(
				new ImageToEmotion(ImageFilename.create(image.getFilename()))
			);

			eventBus.assertPublishHasBeenCalled();
		});
	});
});
