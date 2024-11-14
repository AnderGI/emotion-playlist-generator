import { ImageSaver } from '../../../../src/contexts/backoffice/image/application/save/ImageSaver';
import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';
import { ImageRepository } from '../../../../src/contexts/backoffice/image/domain/ImageRepository';
import { MockImageRepository } from '../__mocks__/MockImageRepository';
import { ImageMother } from '../domain/ImageMother';

const givenAMockImageRepository = () => new MockImageRepository();
const givenAImageSaver = (imageRepository: ImageRepository) => new ImageSaver(imageRepository);

describe('Image Saver', () => {
	it('Should save an image', async () => {
		const imageRepository: MockImageRepository = givenAMockImageRepository();
		const imageSaver: ImageSaver = givenAImageSaver(imageRepository);
		const image: Image = ImageMother.create('id', 'Path');
		await imageSaver.save(image.getId(), image.getPath());
		imageRepository.assertSaveHasBeenCalledWith(image);
	});
});
