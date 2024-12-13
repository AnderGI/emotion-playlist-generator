import { ImageFilename } from '../../../../src/contexts/backoffice/image/domain/ImageFilename';
import ImageToEmotionRelator, {
	GeneratorResult
} from '../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotionRelator';

export default class MockImageToEmotionRelator implements ImageToEmotionRelator {
	private readonly relateMock: jest.Mock;
	constructor() {
		this.relateMock = jest.fn();
	}

	async relate(path: ImageFilename): Promise<GeneratorResult> {
		return this.relateMock(path) as Promise<GeneratorResult>;
	}

	public assertRelateHasBeenCalledWith(path: ImageFilename): void {
		expect(this.relateMock).toHaveBeenCalledWith(path);
	}
}
