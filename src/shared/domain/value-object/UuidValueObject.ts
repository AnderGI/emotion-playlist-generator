import { UUID } from 'bson';

import { StringValueObject } from './StringValueObject';

export class UuidValueObject extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.ensureIsValid(value);
	}

	public static random(): string {
		const uuid = new UuidValueObject(UUID.generate().toString());

		return uuid.getValue();
	}

	private ensureIsValid(value: string): void {
		if (!UUID.isValid(value)) {
			throw new Error(`Invalid uuid ${value}`);
		}
	}
}
