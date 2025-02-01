import SubmitImageCommand from '../../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { Image } from '../../../../../src/contexts/backoffice/image/domain/Image';
import { ImageDirnameMother } from './ImageDirnameMother';
import { ImageFilenameMother } from './ImageFilenameMother';
import { ImageIdMother } from './ImageIdMother';

export class ImageMother {
	static random(): Image {
		return Image.create({
			id: ImageIdMother.random().getId(),
			filename: ImageFilenameMother.random().getFilename(),
			dirname: ImageDirnameMother.create().getDirname()
		});
	}

	static fromCommand(createImageCommand: SubmitImageCommand): Image {
		return Image.create({
			id: createImageCommand.params.id,
			filename: createImageCommand.params.filename,
			dirname: createImageCommand.params.dirname
		});
	}
}
