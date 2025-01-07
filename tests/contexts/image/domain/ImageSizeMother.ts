import { datatype } from 'faker';

import ImageSize from '../../../../src/contexts/backoffice/image/domain/ImageSize';

export class ImageSizeMother {
	static create(value?: number): ImageSize {
		return new ImageSize(value ?? datatype.number());
	}
}
