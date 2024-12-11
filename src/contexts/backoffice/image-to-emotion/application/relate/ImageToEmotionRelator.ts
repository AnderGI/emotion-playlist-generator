import { ImageCreatedDomainEvent } from '../../../image/application/save/ImageCreatedDomainEvent';
import { ImagePath } from '../../../image/domain/ImagePath';
import { ImageToEmotionGenerator } from '../../domain/ImageToEmotionGenerator';

export default class ImageToEmotionRelator {
	constructor(private readonly imageToEmotionGenerator: ImageToEmotionGenerator) {}

	public async run(event: ImageCreatedDomainEvent): Promise<void> {
		await this.imageToEmotionGenerator.generate(ImagePath.create(event.path));
	}
}
