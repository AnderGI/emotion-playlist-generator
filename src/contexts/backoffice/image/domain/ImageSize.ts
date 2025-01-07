import NumberValueObject from '../../../shared/domain/value-object/NumberValueObject';

export default class ImageSize extends NumberValueObject {
	public static create(size: number): ImageSize {
		return new ImageSize(size);
	}

	public getSize(): number {
		return this.value;
	}
}
