import { ImageSaver } from '../../../../../src/contexts/backoffice/image/application/save/ImageSaver';
import { Image } from '../../../../../src/contexts/backoffice/image/domain/Image';
import { ImageRepository } from '../../../../../src/contexts/backoffice/image/domain/ImageRepository';
import { InMemoryImageRepository } from '../../../../../src/contexts/backoffice/image/infrastructure/persistence/InMemoryImageRepository';
import { ImageIdMother } from '../../domain/ImageIdMother';
import { ImageMother } from '../../domain/ImageMother';

const givenAInMemoryImageRepository = () => new InMemoryImageRepository();
const givenAImageSaver = (imageRepository: ImageRepository) => new ImageSaver(imageRepository);
const inMemoryImageRepository: InMemoryImageRepository = givenAInMemoryImageRepository();

describe('In Memory Image Repository', () => {
	it('Should save an image', async () => {
		const imageSaver: ImageSaver = givenAImageSaver(inMemoryImageRepository);
		const image: Image = ImageMother.create('id', 'fakePath');

		await imageSaver.save(image.getId(), image.getPath());

		const expectedImage: Image = await inMemoryImageRepository.search(
			ImageIdMother.create(image.getId())
		);

		expect(image).toEqual(expectedImage);
	});
});

afterAll(async () => {
	await inMemoryImageRepository.removeAllImages();
});
