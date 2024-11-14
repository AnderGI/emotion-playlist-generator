export class ImagePath {
	constructor(private readonly path: string) {}

	public static create(path: string): ImagePath {
		return new ImagePath(path);
	}

	public getPath(): string {
		return this.path;
	}

	public equals(other: ImagePath): boolean {
		return this.constructor.name === other.constructor.name && this.path === other.path;
	}

	public toString(): string {
		return this.path;
	}
}
