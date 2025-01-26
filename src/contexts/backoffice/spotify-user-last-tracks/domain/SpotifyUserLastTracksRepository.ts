import SpotifyUserLastTracks from './SpotifyUserLastTracks';

export default interface SpotifyUserLastTracksRepository {
	save(user: SpotifyUserLastTracks): Promise<void>;
}
