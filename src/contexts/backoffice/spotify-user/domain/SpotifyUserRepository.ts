import SpotifyUser from './SpotifyUser';

export interface SpotifyUserRepository {
	save(spotifyUser: SpotifyUser): Promise<void>;
}
