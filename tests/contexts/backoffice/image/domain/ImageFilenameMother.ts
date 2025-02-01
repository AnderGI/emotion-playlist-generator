import { system } from 'faker';

import { ImageFilename } from '../../../../../src/contexts/backoffice/image/domain/ImageFilename';

export class ImageFilenameMother {
	static random(): ImageFilename {
		return ImageFilename.create(system.fileName());
	}

	static create(filename: string): ImageFilename {
		return ImageFilename.create(filename);
	}
}
