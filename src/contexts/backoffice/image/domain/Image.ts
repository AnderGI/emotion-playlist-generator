import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { ImageFilename } from './ImageFilename';
import { ImageId } from './ImageId';

export class Image implements AggregateRoot {
	constructor(readonly id: ImageId, readonly filename: ImageFilename) {
		this.id;
		this.filename;
	}

	public static create({ id, filename }: { id: string; filename: string }): Image {
		const image: Image = new Image(ImageId.create(id), ImageFilename.create(filename));

		return image;
	}

	toPrimitives(): { id: string; path: string } {
		return {
			id: this.getId(),
			path: this.getFilename()
		};
	}

	public equals(other: Image): boolean {
		return this.id === other.id;
	}

	public getId(): string {
		return this.id.getId();
	}

	public getFilename(): string {
		return this.filename.getFilename();
	}
}
