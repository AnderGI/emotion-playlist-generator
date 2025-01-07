import { UuidValueObject } from '../../../shared/domain/value-object/UuidValueObject';

export class ImageId extends UuidValueObject {
	public static create(id: string): ImageId {
		return new ImageId(id);
	}

	public getId(): string {
		return this.value;
	}
}
