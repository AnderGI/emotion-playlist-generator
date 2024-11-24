import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { ImageId } from './ImageId';
import { ImagePath } from './ImagePath';

export class Image implements AggregateRoot {
	constructor(readonly id: ImageId, readonly path: ImagePath) {
		this.id;
		this.path;
	}

	public static create({ id, path }: { id: string; path: string }): Image {
		const image: Image = new Image(ImageId.create(id), ImagePath.create(path));

		return image;
	}

	toPrimitives(): { id: string; path: string } {
		return {
			id: this.getId(),
			path: this.getPath()
		};
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
