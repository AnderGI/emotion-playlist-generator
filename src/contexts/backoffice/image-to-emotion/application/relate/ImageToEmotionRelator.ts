import { ImageCreatedDomainEvent } from '../../../image/application/save/ImageCreatedDomainEvent';
import { ImageFilename } from '../../../image/domain/ImageFilename';
import ImageToEmotionRelator from '../../domain/ImageToEmotionRelator';

export default class ImageToEmotionGenerator {
	constructor(private readonly imageToEmotionGenerator: ImageToEmotionRelator) {}

	public async run(event: ImageCreatedDomainEvent): Promise<void> {
		await this.imageToEmotionGenerator.relate(ImageFilename.create(event.filename));
	}
}
