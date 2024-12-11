import { ImagePath } from '../../../../../src/contexts/backoffice/image/domain/ImagePath';
import ImageToEmotionRelator from '../../../../../src/contexts/backoffice/image-to-emotion/application/relate/ImageToEmotionRelator';
import { RelateImageToEmotionOnImageCreated } from '../../../../../src/contexts/backoffice/image-to-emotion/application/relate/RelateImageToEmotionOnImageCreated';
import { ImageCreatedDomainEventMother } from '../../../image/domain/ImageCreatedDomainEventMother';
import { ImageMother } from '../../../image/domain/ImageMother';
import MockImageToEmotionGenerator from '../../__mocks__/MockImageToEmotionGenerator';

describe('ImageToEmotionRelator', () => {
	describe('#generate', () => {
		it('should search for valid emotions from image', async () => {
			const imageToEmotionGenerator: MockImageToEmotionGenerator =
				new MockImageToEmotionGenerator();
			const imageToEmotionRelator: ImageToEmotionRelator = new ImageToEmotionRelator(
				imageToEmotionGenerator
			);
			const image = ImageMother.random();
			const imageCreatedDomainEvent = ImageCreatedDomainEventMother.create(image);
			const consumer: RelateImageToEmotionOnImageCreated = new RelateImageToEmotionOnImageCreated(
				imageToEmotionRelator
			);

			await consumer.on(imageCreatedDomainEvent);

			imageToEmotionGenerator.assertGenerateHasBeenCalledWith(ImagePath.create(image.getPath()));
		});
	});
});
