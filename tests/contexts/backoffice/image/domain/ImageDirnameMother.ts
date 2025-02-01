import { system } from 'faker';

import { ImageDirname } from '../../../../../src/contexts/backoffice/image/domain/ImageDirname';

export class ImageDirnameMother {
	static create(value?: string): ImageDirname {
		return new ImageDirname(value ?? system.directoryPath());
	}
}
