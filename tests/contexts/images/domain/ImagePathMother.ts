import { ImagePath } from '../../../../src/contexts/backoffice/image/domain/ImagePath';

export class ImagePathMother {
	static create(path: string): ImagePath {
		return ImagePath.create(path);
	}
}
