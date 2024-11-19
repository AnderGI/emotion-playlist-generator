import { v4, validate } from 'uuid';

import { StringValueObject } from './StringValueObject';

export class UuidValueObject extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.ensureIsValid(value);
	}

	public static random(): string {
		const uuid = new UuidValueObject(v4());

		return uuid.getValue();
	}

	private ensureIsValid(value: string): void {
		if (!validate(value)) {
			throw new Error(`Invalid uuid ${value}`);
		}
	}
}
