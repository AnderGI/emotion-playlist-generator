import { ImageRepository } from '../../../../../../src/contexts/backoffice/image/domain/ImageRepository';
import { EnvironmentArranger } from '../../../../shared/infrastructure/arranger/EnvironmentArranger';
import { ImageMother } from '../../domain/ImageMother';

export class ImageRepositoryArrenger {
	constructor(
		private readonly repository: ImageRepository,
		private readonly environmentArranger: EnvironmentArranger
	) {}

	public async saveImage(): Promise<void> {
		await this.cleanFirst();
		const image = ImageMother.random();
		console.log(image);
		await this.repository.save(image);
		await this.cleanEnd();
	}

	private async cleanFirst(): Promise<void> {
		await this.environmentArranger.clean();
	}

	private async cleanEnd(): Promise<void> {
		await this.environmentArranger.clean();
		await this.environmentArranger.close();
	}
}
