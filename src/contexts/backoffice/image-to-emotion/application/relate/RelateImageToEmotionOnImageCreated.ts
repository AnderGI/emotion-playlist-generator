import { DomainEventClass } from '../../../../shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/event/DomainEventSubscriber';
import { ImageCreatedDomainEvent } from '../../../image/application/save/ImageCreatedDomainEvent';
import ImageToEmotionRelator from './ImageToEmotionRelator';

export class RelateImageToEmotionOnImageCreated
	implements DomainEventSubscriber<ImageCreatedDomainEvent>
{
	constructor(private readonly imageToEmotionRelator: ImageToEmotionRelator) {}

	subscribedTo(): DomainEventClass[] {
		return [ImageCreatedDomainEvent];
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async on(domainEvent: ImageCreatedDomainEvent): Promise<void> {
		await this.imageToEmotionRelator.run(domainEvent);
	}

	queueName(): string {
		return 'andergi.backoffice.image-to-emotion.relate_image_to_emotion_on_image_created';
	}
}
