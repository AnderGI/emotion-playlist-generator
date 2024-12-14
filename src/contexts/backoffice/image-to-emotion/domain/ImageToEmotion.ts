import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { ImageFilename } from '../../image/domain/ImageFilename';

export default class ImageToEmotion implements AggregateRoot {
	constructor(private readonly filename: ImageFilename) {}

	public static create({ filename }: { filename: string }): ImageToEmotion {
		return new ImageToEmotion(ImageFilename.create(filename));
	}

	public getFilename(): string {
		return this.filename.getValue();
	}

	toPrimitives(): { filename: string } {
		return {
			filename: this.filename.getValue()
		};
	}
}
