type Primitives = string | boolean | number | Date;

export abstract class ValueObject<P extends Primitives> {
	constructor(readonly value: P) {}
	abstract getValue(): P;

	public toString(): string {
		return this.value.toString();
	}

	public equals(other: ValueObject<P>): boolean {
		return this.constructor.name === other.constructor.name && this.value === other.value;
	}
}
