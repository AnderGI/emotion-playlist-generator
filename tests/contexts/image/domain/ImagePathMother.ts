import { system } from 'faker';

import { ImagePath } from '../../../../src/contexts/backoffice/image/domain/ImagePath';

export class ImagePathMother {
	static random(): ImagePath {
		return ImagePath.create(system.filePath());
	}

	static create(path: string): ImagePath {
		return ImagePath.create(path);
	}
}
