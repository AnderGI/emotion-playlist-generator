import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export class ImageFilename extends StringValueObject {
	constructor(private readonly filename: string) {
		super(filename);
	}

	public static create(filename: string): ImageFilename {
		return new ImageFilename(filename);
	}

	public getFilename(): string {
		return this.filename;
	}
}
