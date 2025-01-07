import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export default class ImageDestination extends StringValueObject {
	constructor(private readonly destination: string) {
		super(destination);
	}

	public static create(destination: string): ImageDestination {
		return new ImageDestination(destination);
	}

	public getDestination(): string {
		return this.destination;
	}
}
