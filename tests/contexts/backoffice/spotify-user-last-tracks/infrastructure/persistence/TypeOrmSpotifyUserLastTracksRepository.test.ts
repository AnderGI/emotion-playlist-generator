import EnvironmentArrengerFactory from '../../../../shared/infrastructure/arranger/EnvironmentArrengerFactory';
import SpotifyUserLastTracksRepositoryArrenger from './SpotifyUserLastTracksRepositoryArrenger';
import TestSpotifyUserLastTracksRepositoryFactory from './TestSpotifyUserLastTracksRepositoryFactory';

describe('TypeOrmSpotifyUserLastTracksRepository', () => {
	describe('#save', () => {
		it('should save a spotify user last tracks', async () => {
			const arrenger = new SpotifyUserLastTracksRepositoryArrenger(
				TestSpotifyUserLastTracksRepositoryFactory.getRepository(),
				EnvironmentArrengerFactory.getArranger()
			);
			await arrenger.saveSpotifyUser();
		});
	});
});
