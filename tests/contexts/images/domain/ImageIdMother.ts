import { ImageId } from '../../../../src/contexts/backoffice/image/domain/ImageId';

export class ImageIdMother {
	static create(id: string): ImageId {
		return ImageId.create(id);
	}
}
