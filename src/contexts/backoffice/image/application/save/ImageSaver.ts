import CreateImageCommand from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { Image } from '../../domain/Image';
import { ImageRepository } from '../../domain/ImageRepository';

export class ImageSaver {
	constructor(private readonly imageRepository: ImageRepository) {}

	public async save(command: CreateImageCommand): Promise<void> {
		const { id, path } = command;
		await this.imageRepository.save(Image.create({ id, path }));

		return Promise.resolve();
	}
}
