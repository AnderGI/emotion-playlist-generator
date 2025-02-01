import EnvironmentArrengerFactory from '../../../../shared/infrastructure/arranger/EnvironmentArrengerFactory';
import { ImageRepositoryArrenger } from './ImageRepositoryArrenger';
import TestImageRepositoryFactory from './TestImageRepositoryFactory';

describe('TypeOrmImageRepository', () => {
	describe('#save', () => {
		it('should save a course', async () => {
			const arrenger = new ImageRepositoryArrenger(
				TestImageRepositoryFactory.getRepository(),
				EnvironmentArrengerFactory.getArranger()
			);
			await arrenger.saveImage();
		});
	});
});
