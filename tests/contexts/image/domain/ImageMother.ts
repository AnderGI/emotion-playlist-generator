import SubmitImageCommand from '../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';
import { ImageDestinationMother } from './ImageDestinationMother';
import { ImageFilenameMother } from './ImageFilenameMother';
import { ImageIdMother } from './ImageIdMother';
import { ImageMimetypeMother } from './ImageMimetypeMother';
import { ImageSizeMother } from './ImageSizeMother';

export class ImageMother {
	static random(): Image {
		return Image.create({
			id: ImageIdMother.random().getId(),
			filename: ImageFilenameMother.random().getFilename(),
			destination: ImageDestinationMother.create().getDestination(),
			mimetype: ImageMimetypeMother.create().getMimetype(),
			size: ImageSizeMother.create().getSize()
		});
	}

	static fromCommand(createImageCommand: SubmitImageCommand): Image {
		return Image.create({
			id: createImageCommand.params.id,
			filename: createImageCommand.params.filename,
			destination: createImageCommand.params.destination,
			mimetype: createImageCommand.params.mimetype,
			size: createImageCommand.params.size
		});
	}
}
