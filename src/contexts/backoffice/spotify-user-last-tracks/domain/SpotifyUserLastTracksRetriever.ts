import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from '../application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';
import { SpotifyUserLastTracksData } from '../application/save-spotify-user-last-tracks/SpotifyUserLastTracksData';

export default interface SpotifyUserLastTracksRetriever {
	retrieve(
		command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand
	): Promise<SpotifyUserLastTracksData>;
}
