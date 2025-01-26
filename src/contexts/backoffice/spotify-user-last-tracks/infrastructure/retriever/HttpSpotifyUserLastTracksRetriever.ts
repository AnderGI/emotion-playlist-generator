import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from '../../application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';
import { SpotifyUserLastTracksData } from '../../application/save-spotify-user-last-tracks/SpotifyUserLastTracksData';
import SpotifyUserLastTracksRetriever from '../../domain/SpotifyUserLastTracksRetriever';

export default class HttpSpotifyUserLastTracksRetriever implements SpotifyUserLastTracksRetriever {
	async retrieve(
		command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand
	): Promise<SpotifyUserLastTracksData> {
		console.log('----- infra command');
		console.log(command);
		const url = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0';

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${command.data.access_token}`
			}
		});
		console.log('----- todo ok');
		if (!response.ok) {
			console.log('----- not ok');
			throw new Error('Error fetching data from Spotify API');
		}

		const data = (await response.json()) as SpotifyUserLastTracksData;

		return data;
	}
}
