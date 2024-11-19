import CreateImageCommandHandler from '../../../../src/contexts/backoffice/image/application/save/CreateImageCommandHandler';
import { ImageCreatedDomainEvent } from '../../../../src/contexts/backoffice/image/application/save/ImageCreatedDomainEvent';
import { ImageSaver } from '../../../../src/contexts/backoffice/image/application/save/ImageSaver';
import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';
import { ImageRepository } from '../../../../src/contexts/backoffice/image/domain/ImageRepository';
import { EventBus } from '../../../../src/shared/domain/bus/event/EventBus';
import { MockEventBus } from '../__mocks__/MockEventBus';
import { MockImageRepository } from '../__mocks__/MockImageRepository';
import { CreateImageCommandMother } from '../domain/CreateImageCommandMother';
import { ImageCreatedDomainEventMother } from '../domain/ImageCreatedDomainEventMother';
import { ImageMother } from '../domain/ImageMother';

const givenAMockImageRepository = () => new MockImageRepository();
const givenAMockEventBus = () => new MockEventBus();
const givenAImageSaver = (imageRepository: ImageRepository, eventBus: EventBus) =>
	new ImageSaver(imageRepository, eventBus);
const givenACreateImageCommand = () => CreateImageCommandMother.random();
const givenACreateImageCommandHandler = (imageSaver: ImageSaver) =>
	new CreateImageCommandHandler(imageSaver);
describe('Image Saver', () => {
	it('Should save an image', async () => {
		const imageRepository: MockImageRepository = givenAMockImageRepository();
		const eventBus: MockEventBus = givenAMockEventBus();
		const imageSaver: ImageSaver = givenAImageSaver(imageRepository, eventBus);
		const handler = givenACreateImageCommandHandler(imageSaver);
		const command = givenACreateImageCommand();
		const image: Image = ImageMother.fromCommand(command);
		const event: ImageCreatedDomainEvent = ImageCreatedDomainEventMother.create(image);
		await handler.handle(command);
		imageRepository.assertSaveHasBeenCalledWith(image);
		eventBus.assertBusHasBeenCalledWith(event);
	});
});
