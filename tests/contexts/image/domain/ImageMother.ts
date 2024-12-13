import CreateImageCommand from '../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';
import { ImageFilenameMother } from './ImageFilenameMother';
import { ImageIdMother } from './ImageIdMother';

export class ImageMother {
	static random(): Image {
		return Image.create({
			id: ImageIdMother.random().getId(),
			filename: ImageFilenameMother.random().getFilename()
		});
	}

	static fromCommand(createImageCommand: CreateImageCommand): Image {
		return Image.create({
			id: createImageCommand.id,
			filename: createImageCommand.filename
		});
	}
}
