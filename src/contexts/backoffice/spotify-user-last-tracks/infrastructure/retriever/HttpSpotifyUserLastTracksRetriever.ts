import logger from '../../../../../shared/infrastructure/winston/config';
import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from '../../application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';
import { SpotifyUserLastTracksData } from '../../application/save-spotify-user-last-tracks/SpotifyUserLastTracksData';
import SpotifyUserLastTracksRetriever from '../../domain/SpotifyUserLastTracksRetriever';

export default class HttpSpotifyUserLastTracksRetriever implements SpotifyUserLastTracksRetriever {
	async retrieve(
		command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand
	): Promise<SpotifyUserLastTracksData> {
		logger.info('--- HttpSpotifyUserLastTracksRetriever#retrieve');
		const url = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0';

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${command.data.accessToken}`
			}
		});
		logger.info('--- After data fetch everything ok');
		if (!response.ok) {
			logger.error('--- HttpSpotifyUserLastTracksRetriever#retrieve');
			throw new Error('Error fetching data from Spotify API');
		}

		const data = (await response.json()) as SpotifyUserLastTracksData;

		return data;
	}
}
