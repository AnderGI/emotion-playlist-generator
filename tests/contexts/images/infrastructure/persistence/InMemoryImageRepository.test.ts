import { Image } from '../../../../../src/contexts/backoffice/image/domain/Image';
import { InMemoryImageRepository } from '../../../../../src/contexts/backoffice/image/infrastructure/persistence/in-memory/InMemoryImageRepository';
import { ImageIdMother } from '../../../image/domain/ImageIdMother';
import { ImageMother } from '../../../image/domain/ImageMother';

const givenAInMemoryImageRepository = () => new InMemoryImageRepository();
const inMemoryImageRepository: InMemoryImageRepository = givenAInMemoryImageRepository();

describe('In Memory Image Repository', () => {
	describe('#save', () => {
		it('should save an image', async () => {
			const image = ImageMother.random();
			await inMemoryImageRepository.save(image);
			const expectedImage: Image = await inMemoryImageRepository.search(
				ImageIdMother.create(image.getId())
			);

			expect(image).toEqual(expectedImage);
		});
	});
});

afterAll(async () => {
	await inMemoryImageRepository.removeAllImages();
});
