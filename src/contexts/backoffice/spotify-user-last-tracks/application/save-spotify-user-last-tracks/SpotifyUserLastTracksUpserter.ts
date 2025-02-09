import { Nullable } from '../../../../../shared/domain/Nullable';
import logger from '../../../../../shared/infrastructure/winston/config';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import SpotifyUserLastTracksFetcher from '../../domain/fetch/SpotifyUserLastTracksFetcher';
import SpotifyUserLastTracksSearcher from '../../domain/search/SpotifyUserLastTracksSearcher';
import SpotifyUserLastTracks from '../../domain/SpotifyUserLastTracks';
import SpotifyUserLastTracksRepository from '../../domain/SpotifyUserLastTracksRepository';
import SpotifyUserLastTracksRetriever from '../../domain/SpotifyUserLastTracksRetriever';
import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from './GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';

export default class SpotifyUserLastTracksUpserter {
	constructor(
		private readonly retriever: SpotifyUserLastTracksRetriever,
		private readonly repository: SpotifyUserLastTracksRepository,
		private readonly bus: EventBus
	) {}

	public async run(command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand): Promise<void> {
		const exitingUser = await this.search(this.repository)(command);

		if (this.isExistingUserUpToDate(exitingUser)) {
			logger.warn('Does not need updates');

			return Promise.resolve();
		}

		const tracks = await this.fetchUsersLastTracks(this.retriever)(command);

		await this.upsert(this.repository, this.bus)(command, tracks);
	}

	private upsert(repository: SpotifyUserLastTracksRepository, bus: EventBus) {
		return async (
			command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand,
			tracks: string[]
		) => {
			await SpotifyUserLastTracks.upsert(
				repository,
				bus
			)({
				userId: command.data.aggregateId,
				topTracks: tracks,
				updatedAt: new Date().getTime()
			});
		};
	}

	private fetchUsersLastTracks(retriever: SpotifyUserLastTracksRetriever) {
		return async (command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand) => {
			const data = await SpotifyUserLastTracksFetcher.getSpotifyUserLastTracks(retriever)(command);

			return data.items.map(item => {
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
		};
	}

	private isExistingUserUpToDate(exitingUser: Nullable<SpotifyUserLastTracks>) {
		return (
			exitingUser !== null &&
			exitingUser !== undefined &&
			!exitingUser.tracksShouldBeUpdatedAfterThreeWeeks()
		);
	}

	private search(repository: SpotifyUserLastTracksRepository) {
		return async (command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand) => {
			return await SpotifyUserLastTracksSearcher.search(repository, command.data.aggregateId);
		};
	}
}
