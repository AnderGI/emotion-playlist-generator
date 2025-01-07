import { system } from 'faker';

import ImageDestination from '../../../../src/contexts/backoffice/image/domain/ImageDestination';

export class ImageDestinationMother {
	static create(value?: string): ImageDestination {
		return new ImageDestination(value ?? system.directoryPath());
	}
}
