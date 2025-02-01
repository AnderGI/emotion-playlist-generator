import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export class ImageDirname extends StringValueObject {
	public static create(dirname: string): ImageDirname {
		return new ImageDirname(dirname);
	}

	public getDirname(): string {
		return this.value;
	}
}
