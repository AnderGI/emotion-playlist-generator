import logger from '../../../../../shared/infrastructure/winston/config';
import SpotifyUserLastTracksGetter from '../../domain/get-spotify-user-last-tracks/SpotifyUserLastTracksGetter';
import DomainSpotifyUserLastTracksSearcher from '../../domain/search/DomainSpotifyUserLastTracksSearcher';
import SpotifyUserLastTracks from '../../domain/SpotifyUserLastTracks';
import SpotifyUserLastTracksRepository from '../../domain/SpotifyUserLastTracksRepository';
import SpotifyUserLastTracksRetriever from '../../domain/SpotifyUserLastTracksRetriever';
import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from './GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';

export default class SpotifyUserLastTracksSaver {
	constructor(
		private readonly spotifyUserLastTracksRetriever: SpotifyUserLastTracksRetriever,
		private readonly spotifyUserLastTracksRepository: SpotifyUserLastTracksRepository
	) {}

	public async run(command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand): Promise<void> {
		logger.info('--- SpotifyUserLastTracksSaver#run');
		logger.info('--- command');
		logger.info(JSON.stringify(command, null, 2));
		logger.info('--- Before searching in ddbb');

		// Get Spotify User Last Tracks
		const exitingUser = await DomainSpotifyUserLastTracksSearcher.search(
			this.spotifyUserLastTracksRepository,
			command.data.spotify_id
		);
		logger.info('--- existing user');
		logger.info(exitingUser);

		if (!exitingUser?.tracksShouldBeUpdatedAfterThreeWeeks()) {
			logger.info('no necessary update');

			return Promise.resolve();
		}
		// See if update is necessary

		// If it is do de update
		logger.info('--- Before retrieving spotify users last tracks');
		const data = await SpotifyUserLastTracksGetter.getSpotifyUserLastTracks(
			this.spotifyUserLastTracksRetriever
		)(command);
		logger.info('--- AAfter retrieving spotify user last tracks');
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

		logger.info('--- SPotifyUserLastTracks top tracks');
		logger.info(JSON.stringify(tracks, null, 2));

		// save DOMAIN
		logger.info('--- Before calling SpotifyUserLastTracks');
		await SpotifyUserLastTracks.save(this.spotifyUserLastTracksRepository)({
			userId: command.data.spotify_id,
			topTracks: tracks,
			updatedAt: new Date().getTime()
		});
		logger.info('--- After calling SpotifyUserLastTracks');
	}
}
