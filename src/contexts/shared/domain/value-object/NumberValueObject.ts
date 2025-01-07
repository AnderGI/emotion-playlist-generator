import { ValueObject } from './ValueObject';

export default class NumberValueObject extends ValueObject<number> {
	getValue(): number {
		return this.value;
	}
}
