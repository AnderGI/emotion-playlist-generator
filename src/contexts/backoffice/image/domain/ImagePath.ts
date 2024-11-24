import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export class ImagePath extends StringValueObject {
	constructor(private readonly path: string) {
		super(path);
	}

	public static create(path: string): ImagePath {
		return new ImagePath(path);
	}

	public getPath(): string {
		return this.path;
	}
}
