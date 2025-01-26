import EnvironmentArrengerFactory from '../../../../shared/infrastructure/arranger/EnvironmentArrengerFactory';
import SpotifyUserRepositoryArrenger from './SpotifyUserRepositoryArrenger';
import TestSpotifyUserRepositoryFactory from './TestSpotifyUserRepositoryFactory';

describe('TypeOrmSpotifyUserRepository', () => {
	describe('#save', () => {
		it('should save a spotify user', async () => {
			const arrenger = new SpotifyUserRepositoryArrenger(
				TestSpotifyUserRepositoryFactory.getRepository(),
				EnvironmentArrengerFactory.getArranger()
			);
			await arrenger.saveSpotifyUser();
		});
	});
});
