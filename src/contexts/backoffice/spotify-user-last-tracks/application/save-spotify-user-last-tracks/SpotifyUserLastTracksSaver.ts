import SpotifyUserLastTracksGetter from '../../domain/get-spotify-user-last-tracks/SpotifyUserLastTracksGetter';
import SpotifyUserLastTracks from '../../domain/SpotifyUserLastTracks';
import SpotifyUserLastTracksRepository from '../../domain/SpotifyUserLastTracksRepository';
import SpotifyUserLastTracksRetriever from '../../domain/SpotifyUserLastTracksRetriever';
import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from './GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';

export default class SpotifyUserLastTracksSaver {
	constructor(
		private readonly spotifyUserLastTracksRetriever: SpotifyUserLastTracksRetriever,
		private readonly spotifyUserLastTracksRepository: SpotifyUserLastTracksRepository
	) {}

	// change return type
	public async run(command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand): Promise<void> {
		// get last tracks DOMAIN
		const data = await SpotifyUserLastTracksGetter.getSpotifyUserLastTracks(
			this.spotifyUserLastTracksRetriever
		)(command);

		// Deserialize
		const tracks = data.items.map(item => {
			return JSON.stringify({
				album_id: item.album.id,
				album_name: item.album.name,
				album_release_date: item.album.release_date,
				artist_name: item.artists[0].name,
				playable: item.is_playable,
				track_name: item.name,
				track_popularity: item.popularity,
				track_url: item.external_urls.spotify
			});
		});

		// save DOMAIN
		await SpotifyUserLastTracks.save(this.spotifyUserLastTracksRepository)({
			userId: command.data.aggregateId,
			topTracks: tracks,
			updatedAt: new Date().getTime()
		});
	}
}
