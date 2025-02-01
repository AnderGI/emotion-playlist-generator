import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import { ImageRepository } from '../../../../../../src/contexts/backoffice/image/domain/ImageRepository';

export default class TestImageRepositoryFactory {
	public static getRepository(): ImageRepository {
		return container.get('backoffice.image.ImageRepository');
	}
}
