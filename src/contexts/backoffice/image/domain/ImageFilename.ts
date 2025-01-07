import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export class ImageFilename extends StringValueObject {
	public static create(filename: string): ImageFilename {
		return new ImageFilename(filename);
	}

	public getFilename(): string {
		return this.value;
	}
}
