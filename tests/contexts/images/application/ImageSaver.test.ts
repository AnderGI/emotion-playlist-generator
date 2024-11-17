import CreateImageCommandHandler from '../../../../src/contexts/backoffice/image/application/save/CreateImageCommandHandler';
import { ImageSaver } from '../../../../src/contexts/backoffice/image/application/save/ImageSaver';
import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';
import { ImageRepository } from '../../../../src/contexts/backoffice/image/domain/ImageRepository';
import { MockImageRepository } from '../__mocks__/MockImageRepository';
import { CreateImageCommandMother } from '../domain/CreateImageCommandMother';
import { ImageMother } from '../domain/ImageMother';

const givenAMockImageRepository = () => new MockImageRepository();
const givenAImageSaver = (imageRepository: ImageRepository) => new ImageSaver(imageRepository);
const givenACreateImageCommand = () => CreateImageCommandMother.random();
const givenACreateImageCommandHandler = (imageSaver: ImageSaver) =>
	new CreateImageCommandHandler(imageSaver);
describe('Image Saver', () => {
	it('Should save an image', async () => {
		const imageRepository: MockImageRepository = givenAMockImageRepository();
		const imageSaver: ImageSaver = givenAImageSaver(imageRepository);
		const handler = givenACreateImageCommandHandler(imageSaver);
		const command = givenACreateImageCommand();
		const image: Image = ImageMother.fromCommand(command);
		await handler.handle(command);
		imageRepository.assertSaveHasBeenCalledWith(image);
	});
});
