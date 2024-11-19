import CreateImageCommandHandler from '../../../../../src/contexts/backoffice/image/application/save/CreateImageCommandHandler';
import { ImageSaver } from '../../../../../src/contexts/backoffice/image/application/save/ImageSaver';
import { Image } from '../../../../../src/contexts/backoffice/image/domain/Image';
import { ImageRepository } from '../../../../../src/contexts/backoffice/image/domain/ImageRepository';
import { InMemoryImageRepository } from '../../../../../src/contexts/backoffice/image/infrastructure/persistence/InMemoryImageRepository';
import { EventBus } from '../../../../../src/shared/domain/bus/event/EventBus';
import { InMemorySyncEventBus } from '../../../../../src/shared/infrastructure/bus/event/InMemorySyncEventBus';
import { CreateImageCommandMother } from '../../domain/CreateImageCommandMother';
import { ImageIdMother } from '../../domain/ImageIdMother';
import { ImageMother } from '../../domain/ImageMother';

const givenAInMemorySyncEventBus = () => new InMemorySyncEventBus();
const givenAInMemoryImageRepository = () => new InMemoryImageRepository();
const givenAImageSaver = (imageRepository: ImageRepository, eventBus: EventBus) =>
	new ImageSaver(imageRepository, eventBus);
const inMemoryImageRepository: InMemoryImageRepository = givenAInMemoryImageRepository();
const inMemorySyncEventBus: EventBus = givenAInMemorySyncEventBus();
const givenACreateImageCommand = () => CreateImageCommandMother.random();
const givenACreateImageCommandHandler = (imageSaver: ImageSaver) =>
	new CreateImageCommandHandler(imageSaver);

describe('In Memory Image Repository', () => {
	it('Should save an image', async () => {
		const imageSaver: ImageSaver = givenAImageSaver(inMemoryImageRepository, inMemorySyncEventBus);
		const createImageCommand = givenACreateImageCommand();
		const image: Image = ImageMother.fromCommand(createImageCommand);
		const handler = givenACreateImageCommandHandler(imageSaver);
		await handler.handle(createImageCommand);

		const expectedImage: Image = await inMemoryImageRepository.search(
			ImageIdMother.create(image.getId())
		);

		expect(image).toEqual(expectedImage);
	});
});

afterAll(async () => {
	await inMemoryImageRepository.removeAllImages();
});
