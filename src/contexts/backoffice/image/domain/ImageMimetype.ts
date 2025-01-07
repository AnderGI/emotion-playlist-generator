import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export default class ImageMimetype extends StringValueObject {
	constructor(private readonly mimetype: string) {
		super(mimetype);
	}

	public static create(mimetype: string): ImageMimetype {
		return new ImageMimetype(mimetype);
	}

	public getMimetype(): string {
		return this.mimetype;
	}
}
