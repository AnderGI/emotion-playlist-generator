import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from '../../application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';
import { SpotifyUserLastTracksData } from '../../application/save-spotify-user-last-tracks/SpotifyUserLastTracksData';
import SpotifyUserLastTracksRetriever from '../SpotifyUserLastTracksRetriever';

export default class SpotifyUserLastTracksGetter {
	public static getSpotifyUserLastTracks(
		spotifyUserLastTracksRepo: SpotifyUserLastTracksRetriever
	) {
		return async (
			command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand
		): Promise<SpotifyUserLastTracksData> => {
			return await spotifyUserLastTracksRepo.retrieve(command);
		};
	}
}
