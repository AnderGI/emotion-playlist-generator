import { DomainEventClass } from '../../../../shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/event/DomainEventSubscriber';
import { ImageCreatedDomainEvent } from '../../../image/application/save/ImageCreatedDomainEvent';

export class RelateImageToEmotionOnImageCreated
	implements DomainEventSubscriber<ImageCreatedDomainEvent>
{
	subscribedTo(): DomainEventClass[] {
		return [ImageCreatedDomainEvent];
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async on(domainEvent: ImageCreatedDomainEvent): Promise<void> {
		throw new Error(`Se ha dado un error a la hora de consumir el evento ${domainEvent.eventName}`);
		//console.log(`${domainEvent.eventName} ha llegado`);
	}

	queueName(): string {
		return 'andergi.backoffice.image-to-emotion.relate_image_to_emotion_on_image_created';
	}
}
