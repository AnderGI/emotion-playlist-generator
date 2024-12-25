import ImageToEmotion from '../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotion';
import ImageToEmotionRelator, {
	GeneratorResult
} from '../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotionRelator';

export default class MockImageToEmotionRelator implements ImageToEmotionRelator {
	private readonly relateMock: jest.Mock;

	constructor(private readonly mockEmotion: string) {
		this.relateMock = jest.fn();
	}

	async relate(imageToEmotion: ImageToEmotion): Promise<GeneratorResult> {
		this.relateMock(imageToEmotion);

		return Promise.resolve({ emotion: this.mockEmotion });
	}

	public assertRelateHasBeenCalledWith(imageToEmotion: ImageToEmotion): void {
		expect(this.relateMock).toHaveBeenCalledWith(imageToEmotion);
	}
}
