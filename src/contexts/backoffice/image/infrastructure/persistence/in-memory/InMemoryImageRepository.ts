import { Image } from '../../../domain/Image';
import { ImageId } from '../../../domain/ImageId';
import { ImageRepository } from '../../../domain/ImageRepository';

export class InMemoryImageRepository extends Map<string, Image> implements ImageRepository {
	async save(image: Image): Promise<void> {
		super.set(image.getId(), image);

		return Promise.resolve();
	}

	async search(imageId: ImageId): Promise<Image> {
		const image: Image | undefined = this.get(imageId.getId());
		if (!image) {
			throw new Error(`Image with ${imageId.getId()} does not exist`);
		}

		return Promise.resolve(image);
	}

	async removeAllImages(): Promise<void> {
		super.clear();

		return Promise.resolve();
	}
}
