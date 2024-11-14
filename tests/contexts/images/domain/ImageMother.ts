import { Image } from '../../../../src/contexts/backoffice/image/domain/Image';

export class ImageMother {
	static create(id: string, path: string): Image {
		return Image.create(id, path);
	}
}
