import container from '../../../../../src/apps/backoffice/backend/dependency-injection';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/EnvironmentArranger';
import { TypeOrmEnvironmentArranger } from '../../../shared/infrastructure/arranger/typeorm/TypeOrmEnvironmentArranger';

export default class EnvironmentArrengerFactory {
	public static getArranger(): EnvironmentArranger {
		return new TypeOrmEnvironmentArranger(container.get('backoffice.shared.TypeOrmClientFactory'));
	}
}
