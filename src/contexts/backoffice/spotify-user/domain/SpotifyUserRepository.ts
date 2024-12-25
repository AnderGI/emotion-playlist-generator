import SpotifyUser from './SpotifyUser';

export interface SpotifyUserRepository {
	register(spotifyUser: SpotifyUser): Promise<void>;
}
