import CreateImageReq from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageReq';
import { Image } from '../../domain/Image';
import { ImageRepository } from '../../domain/ImageRepository';

export class ImageSaver {
	constructor(private readonly imageRepository: ImageRepository) {}

	public async save(req: CreateImageReq): Promise<void> {
		const { id, path } = req;
		await this.imageRepository.save(Image.create({ id, path }));

		return Promise.resolve();
	}
}
