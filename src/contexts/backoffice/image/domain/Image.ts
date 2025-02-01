import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { ImageDirname } from './ImageDirname';
import { ImageFilename } from './ImageFilename';
import { ImageId } from './ImageId';

type CreateImageAggregateParams = {
	id: string; // uuid
	filename: string; //  name
	dirname: string;
};

export class Image implements AggregateRoot {
	constructor(
		readonly id: ImageId,
		readonly filename: ImageFilename,
		readonly dirname: ImageDirname
	) {
		this.id;
		this.filename;
		this.dirname;
	}

	public static create(params: CreateImageAggregateParams): Image {
		const image: Image = new Image(
			ImageId.create(params.id),
			ImageFilename.create(params.filename),
			ImageDirname.create(params.dirname)
		);

		return image;
	}

	toPrimitives(): {
		id: string;
		filename: string;
		dirname: string;
	} {
		return {
			id: this.getId(),
			filename: this.getFilename(),
			dirname: this.getDirname()
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

	public getDirname(): string {
		return this.dirname.getDirname();
	}
}
