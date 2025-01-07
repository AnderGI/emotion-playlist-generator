import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import ImageDestination from './ImageDestination';
import { ImageFilename } from './ImageFilename';
import { ImageId } from './ImageId';
import ImageMimetype from './ImageMimetype';
import ImageSize from './ImageSize';

type CreateImageAggregateParams = {
	id: string; // uuid
	mimetype: string; // image/png
	destination: string; //dir  path
	filename: string; //  name
	size: number; // number
};

export class Image implements AggregateRoot {
	constructor(
		readonly id: ImageId,
		readonly filename: ImageFilename,
		readonly mimetype: ImageMimetype,
		readonly destination: ImageDestination,
		readonly size: ImageSize
	) {
		this.id;
		this.filename;
		this.mimetype;
		this.destination;
		this.size;
	}

	public static create(params: CreateImageAggregateParams): Image {
		const image: Image = new Image(
			ImageId.create(params.id),
			ImageFilename.create(params.filename),
			ImageMimetype.create(params.mimetype),
			ImageDestination.create(params.destination),
			ImageSize.create(params.size)
		);

		return image;
	}

	toPrimitives(): {
		id: string;
		path: string;
		mimetype: string;
		destination: string;
		size: number;
	} {
		return {
			id: this.getId(),
			path: this.getFilename(),
			mimetype: this.getMimetype(),
			destination: this.getDestination(),
			size: this.getSize()
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

	public getMimetype(): string {
		return this.mimetype.getMimetype();
	}

	public getDestination(): string {
		return this.destination.getDestination();
	}

	public getSize(): number {
		return this.size.getSize();
	}
}
