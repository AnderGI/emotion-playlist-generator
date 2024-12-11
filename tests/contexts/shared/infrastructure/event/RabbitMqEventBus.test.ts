import container from '../../../../../src/apps/backoffice/backend/dependency-injection';
import { RabbitMqEventBus } from '../../../../../src/contexts/shared/infrastructure/event/RabbitMqEventBus';
import { ImageCreatedDomainEventMother } from '../../../image/domain/ImageCreatedDomainEventMother';
import { ImageMother } from '../../../image/domain/ImageMother';

describe('RabbitMQEventBus', () => {
	describe('#publish', () => {
		it('It should publish an event correctly', async () => {
			const image = ImageMother.random();
			const imageCreatedDomainEvent = ImageCreatedDomainEventMother.create(image);
			const eventBus: RabbitMqEventBus = container.get('backoffice.shared.EventBus');
			await eventBus.publish(imageCreatedDomainEvent);
		});
	});
});
