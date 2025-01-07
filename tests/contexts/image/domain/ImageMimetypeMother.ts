import { system } from 'faker';

import ImageMimetype from '../../../../src/contexts/backoffice/image/domain/ImageMimetype';

export class ImageMimetypeMother {
	static create(value?: string): ImageMimetype {
		return new ImageMimetype(value ?? system.mimeType());
	}
}
