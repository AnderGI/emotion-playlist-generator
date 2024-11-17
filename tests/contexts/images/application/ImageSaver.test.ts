import { ImageSaver } from '../../../../src/contexts/backoffice/image/application/save/ImageSaver';
import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';
import { ImageRepository } from '../../../../src/contexts/backoffice/image/domain/ImageRepository';
import { MockImageRepository } from '../__mocks__/MockImageRepository';
import { CreateImageReqMother } from '../domain/CreateImageReqMother';
import { ImageMother } from '../domain/ImageMother';

const givenAMockImageRepository = () => new MockImageRepository();
const givenAImageSaver = (imageRepository: ImageRepository) => new ImageSaver(imageRepository);
const givenACreateImageReq = () => CreateImageReqMother.random();
describe('Image Saver', () => {
	it('Should save an image', async () => {
		const imageRepository: MockImageRepository = givenAMockImageRepository();
		const imageSaver: ImageSaver = givenAImageSaver(imageRepository);
		const createImageReq = givenACreateImageReq();
		const image: Image = ImageMother.fromRequest(createImageReq);
		await imageSaver.save(createImageReq);
		imageRepository.assertSaveHasBeenCalledWith(image);
	});
});
