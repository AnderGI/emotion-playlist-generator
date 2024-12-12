import { ImagePath } from '../../../../src/contexts/backoffice/image/domain/ImagePath';
import { ImageToEmotionGenerator } from '../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotionGenerator';

export default class MockImageToEmotionGenerator implements ImageToEmotionGenerator {
	private readonly generateMock: jest.Mock;
	constructor() {
		this.generateMock = jest.fn();
	}

	async generate(path: ImagePath): Promise<string> {
		return this.generateMock(path) as Promise<string>;
	}

	public assertGenerateHasBeenCalledWith(path: ImagePath): void {
		expect(this.generateMock).toHaveBeenCalledWith(path);
	}
}
