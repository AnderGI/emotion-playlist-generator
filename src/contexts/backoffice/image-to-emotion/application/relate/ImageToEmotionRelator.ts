import { ImageCreatedDomainEvent } from '../../../image/application/save/ImageCreatedDomainEvent';
import { ImagePath } from '../../../image/domain/ImagePath';
import ImageToEmotionRelator from '../../domain/ImageToEmotionRelator';

export default class ImageToEmotionGenerator {
	constructor(private readonly imageToEmotionGenerator: ImageToEmotionRelator) {}

	public async run(event: ImageCreatedDomainEvent): Promise<void> {
		await this.imageToEmotionGenerator.relate(ImagePath.create(event.path));
	}
}
