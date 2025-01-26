import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import { SpotifyUserRepository } from '../../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUserRepository';

export default class TestSpotifyUserRepositoryFactory {
	public static getRepository(): SpotifyUserRepository {
		return container.get('backoffice.spotify-user.SpotifyUserRepository');
	}
}
