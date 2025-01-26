import { EventBus } from '../../../../shared/domain/event/EventBus';
import ImageToEmotionRelator from '../../domain/ImageToEmotionRelator';
import DomainImageToEmotionRelator from '../../domain/relate/DomainImageToEmotionRelator';
import RelateImageToEmotionCommand from './RelateImageToEmotionCommand';

export default class ImageToEmotionGenerator {
	constructor(
		private readonly imageToEmotionRelator: ImageToEmotionRelator,
		private readonly eventBus: EventBus
	) {}

	public async run(relateImageToEmotionCommand: RelateImageToEmotionCommand): Promise<void> {
		// console.log('ImageToEmotionGenerator');
		await DomainImageToEmotionRelator.relate(
			this.imageToEmotionRelator,
			this.eventBus
		)(relateImageToEmotionCommand);
	}
}
