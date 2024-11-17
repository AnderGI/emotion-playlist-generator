import { ImageId } from './ImageId';
import { ImagePath } from './ImagePath';

export class Image {
	private constructor(private readonly id: ImageId, private readonly path: ImagePath) {
		this.id;
		this.path;
	}

	public static create({ id, path }: { id: string; path: string }): Image {
		const image: Image = new Image(ImageId.create(id), ImagePath.create(path));

		return image;
	}

	public equals(other: Image): boolean {
		return this.id === other.id;
	}

	public getId(): string {
		return this.id.getId();
	}

	public getPath(): string {
		return this.path.getPath();
	}
}
