import { DomainEventClass } from '../../../../shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/event/DomainEventSubscriber';
import { ImageSubmitedDomainEvent } from '../../../image/application/submit/ImageSubmitedDomainEvent';
import ImageToEmotionGenerator from './ImageToEmotionGenerator';
import RelateImageToEmotionCommand from './RelateImageToEmotionCommand';

export class RelateImageToEmotionOnImageSubmited
	implements DomainEventSubscriber<ImageSubmitedDomainEvent>
{
	constructor(private readonly imageToEmotionGenerator: ImageToEmotionGenerator) {}

	subscribedTo(): DomainEventClass[] {
		return [ImageSubmitedDomainEvent];
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async on(domainEvent: ImageSubmitedDomainEvent): Promise<void> {
		// console.log('RelateImageToEmotionOnImageSubmited');
		// console.log(this.imageToEmotionGenerator);
		const { filename } = domainEvent;
		await this.imageToEmotionGenerator.run(new RelateImageToEmotionCommand(filename));
	}

	queueName(): string {
		return 'andergi.backoffice.image-to-emotion.relate_image_to_emotion_on_image_submited';
	}
}
