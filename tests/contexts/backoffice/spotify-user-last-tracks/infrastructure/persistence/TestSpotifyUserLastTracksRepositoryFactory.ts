import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import SpotifyUserLastTracksRepository from '../../../../../../src/contexts/backoffice/spotify-user-last-tracks/domain/SpotifyUserLastTracksRepository';

export default class TestSpotifyUserLastTracksRepositoryFactory {
	public static getRepository(): SpotifyUserLastTracksRepository {
		return container.get('backoffice.spotify-user-last-tracks.SpotifyUserLastTracksRepository');
	}
}
