import { Image } from '../../../../../src/contexts/backoffice/image/domain/Image';
import { ImageId } from '../../../../../src/contexts/backoffice/image/domain/ImageId';
import { ImageRepository } from '../../../../../src/contexts/backoffice/image/domain/ImageRepository';
import { ImageIdMother } from '../domain/ImageIdMother';

export class MockImageRepository implements ImageRepository {
	private readonly saveMock: jest.Mock;
	private readonly searchMock: jest.Mock;

	constructor() {
		this.saveMock = jest.fn();
		this.searchMock = jest.fn();
	}

	async save(image: Image): Promise<void> {
		await this.saveMock(image);
		this.searchMock(ImageIdMother.create(image.getId()));

		return Promise.resolve();
	}

	public assertSaveHasBeenCalledWith(image: Image): void {
		expect(this.saveMock).toBeCalledWith(image);
		this.assertSearchHasBeenCalled(ImageIdMother.create(image.getId()));
	}

	private assertSearchHasBeenCalled(imageId: ImageId): void {
		expect(this.searchMock).toBeCalledWith(imageId);
	}
}
