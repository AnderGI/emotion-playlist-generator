import { ValueObject } from './ValueObject';

export abstract class StringValueObject extends ValueObject<string> {
	getValue(): string {
		return this.value;
	}
}
