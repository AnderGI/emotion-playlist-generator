export class ImageId {
	private constructor(private readonly id: string) {}
	public static create(id: string): ImageId {
		return new ImageId(id);
	}

	public getId(): string {
		return this.id;
	}

	public equals(other: ImageId): boolean {
		return this.id === other.id;
	}

	public toString(): string {
		return this.id;
	}
}
