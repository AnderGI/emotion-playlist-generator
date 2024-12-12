import { ImagePath } from '../../../../src/contexts/backoffice/image/domain/ImagePath';
import ImageToEmotionRelator from '../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotionRelator';

export default class MockImageToEmotionRelator implements ImageToEmotionRelator {
	private readonly relateMock: jest.Mock;
	constructor() {
		this.relateMock = jest.fn();
	}

	async relate(path: ImagePath): Promise<string> {
		return this.relateMock(path) as Promise<string>;
	}

	public assertRelateHasBeenCalledWith(path: ImagePath): void {
		expect(this.relateMock).toHaveBeenCalledWith(path);
	}
}
