import CreateImageCommand from '../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';
import { ImageIdMother } from './ImageIdMother';
import { ImagePathMother } from './ImagePathMother';

export class ImageMother {
	static random(): Image {
		return Image.create({
			id: ImageIdMother.random().getId(),
			path: ImagePathMother.random().getPath()
		});
	}

	static fromCommand(createImageCommand: CreateImageCommand): Image {
		return Image.create({
			id: createImageCommand.id,
			path: createImageCommand.path
		});
	}
}
