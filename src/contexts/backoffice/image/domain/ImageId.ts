import { UuidValueObject } from '../../../shared/domain/value-object/UuidValueObject';

export class ImageId extends UuidValueObject {
	constructor(private readonly id: string) {
		super(id);
	}

	public static create(id: string): ImageId {
		return new ImageId(id);
	}

	public getId(): string {
		return this.id;
	}
}
