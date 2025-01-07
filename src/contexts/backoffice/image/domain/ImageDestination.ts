import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export default class ImageDestination extends StringValueObject {
	public static create(destination: string): ImageDestination {
		return new ImageDestination(destination);
	}

	public getDestination(): string {
		return this.value;
	}
}
