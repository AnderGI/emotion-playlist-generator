import logger from '../../../../../shared/infrastructure/winston/config';
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
			logger.info('--- SpotifyUserLastTracksGetter#getSpotifyUserLastTracks#anonymous');

			return await spotifyUserLastTracksRepo.retrieve(command);
		};
	}
}
