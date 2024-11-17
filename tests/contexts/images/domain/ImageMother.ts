import CreateImageReq from '../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageReq';
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

	static fromRequest(createImageReq: CreateImageReq): Image {
		return Image.create({
			id: createImageReq.id,
			path: createImageReq.path
		});
	}
}
