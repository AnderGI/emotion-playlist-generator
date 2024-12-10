import { DomainEventClass } from '../../../../shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/event/DomainEventSubscriber';
import { ImageCreatedDomainEvent } from '../../../image/application/save/ImageCreatedDomainEvent';

export class RelateImageToEmotionOnImageCreated
	implements DomainEventSubscriber<ImageCreatedDomainEvent>
{
	subscribedTo(): DomainEventClass[] {
		return [ImageCreatedDomainEvent];
	}

	async on(domainEvent: ImageCreatedDomainEvent): Promise<void> {
		console.log(`${domainEvent.eventName} ha llegado`);

		return Promise.resolve();
	}

	queueName(): string {
		return 'andergi.backoffice.image-to-emotion.relate_image_to_emotion_on_image_created';
	}
}
