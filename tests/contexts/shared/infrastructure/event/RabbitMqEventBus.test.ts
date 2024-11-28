import { RabbitMqEventBus } from '../../../../../src/contexts/shared/infrastructure/event/RabbitMqEventBus';
import { ImageCreatedDomainEventMother } from '../../../images/domain/ImageCreatedDomainEventMother';
import { ImageMother } from '../../../images/domain/ImageMother';

describe('RabbitMQEventBus', () => {
	describe('#publish', () => {
		it('It should publish an event correctly', async () => {
			const image = ImageMother.random();
			const imageCreatedDomainEvent = ImageCreatedDomainEventMother.create(image);
			const eventBus = new RabbitMqEventBus();
			await eventBus.publish(imageCreatedDomainEvent);
		});
	});
});
