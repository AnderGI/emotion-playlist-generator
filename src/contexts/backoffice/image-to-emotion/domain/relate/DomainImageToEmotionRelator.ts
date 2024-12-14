import { EventBus } from '../../../../shared/domain/event/EventBus';
import RelateImageToEmotionCommand from '../../application/relate/RelateImageToEmotionCommand';
import ImageToEmotion from '../ImageToEmotion';
import ImageToEmotionRelator from '../ImageToEmotionRelator';
import ImageToEmotionRelatedDomainEvent from './ImageToEmotionRelatedDomainEvent';

export default class DomainImageToEmotionRelator {
	public static relate(imageToEmotionRelator: ImageToEmotionRelator, eventBus: EventBus) {
		return async (relateImageToEmotionCommand: RelateImageToEmotionCommand): Promise<void> => {
			const { filename } = relateImageToEmotionCommand;
			const imageToEmotion = ImageToEmotion.create({ filename });
			const result = await imageToEmotionRelator.relate(imageToEmotion);
			const { emotion } = result;
			await eventBus.publish(
				ImageToEmotionRelatedDomainEvent.fromPrimitives({
					aggregateId: emotion,
					attributes: { filename }
				})
			);
		};
	}
}
