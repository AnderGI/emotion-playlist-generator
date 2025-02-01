import { datatype } from 'faker';

import { ImageId } from '../../../../../src/contexts/backoffice/image/domain/ImageId';

export class ImageIdMother {
	static random(): ImageId {
		return ImageId.create(datatype.uuid());
	}

	static create(id: string): ImageId {
		return ImageId.create(id);
	}
}
