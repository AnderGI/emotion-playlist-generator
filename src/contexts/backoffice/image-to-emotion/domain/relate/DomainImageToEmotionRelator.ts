import { EventBus } from '../../../../shared/domain/event/EventBus';
import RelateImageToEmotionCommand from '../../application/relate/RelateImageToEmotionCommand';
import ImageToEmotion from '../ImageToEmotion';
import ImageToEmotionRelator from '../ImageToEmotionRelator';
import ImageToEmotionRelatedDomainEvent from './ImageToEmotionRelatedDomainEvent';

export default class DomainImageToEmotionRelator {
	public static relate(imageToEmotionRelator: ImageToEmotionRelator, eventBus: EventBus) {
		return async (relateImageToEmotionCommand: RelateImageToEmotionCommand): Promise<void> => {
			// console.log('DomainImageToEmotionRelator');
			const { filename } = relateImageToEmotionCommand;
			const imageToEmotion = ImageToEmotion.create({ filename });
			const result = await imageToEmotionRelator.relate(imageToEmotion);
			const { emotion } = result;
			const domainEvent = ImageToEmotionRelatedDomainEvent.fromPrimitives({
				aggregateId: emotion,
				attributes: { filename }
			});
			// console.log('image to emotion related : ', domainEvent);
			await eventBus.publish(domainEvent);
		};
	}
}
