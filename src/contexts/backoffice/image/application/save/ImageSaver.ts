import { Image } from '../../domain/Image';
import { ImageRepository } from '../../domain/ImageRepository';

export class ImageSaver {
	constructor(private readonly imageRepository: ImageRepository) {}

	public async save(id: string, path: string): Promise<void> {
		await this.imageRepository.save(Image.create(id, path));

		return Promise.resolve();
	}
}
