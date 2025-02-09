import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from '../../application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';
import { SpotifyUserLastTracksData } from '../../application/save-spotify-user-last-tracks/SpotifyUserLastTracksData';
import SpotifyUserLastTracksRetriever from '../SpotifyUserLastTracksRetriever';

export default class SpotifyUserLastTracksFetcher {
	public static getSpotifyUserLastTracks(retriever: SpotifyUserLastTracksRetriever) {
		return async (
			command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand
		): Promise<SpotifyUserLastTracksData> => {
			return await retriever.retrieve(command);
		};
	}
}
