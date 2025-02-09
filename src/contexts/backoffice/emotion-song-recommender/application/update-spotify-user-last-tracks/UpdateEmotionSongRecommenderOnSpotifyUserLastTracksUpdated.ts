import logger from '../../../../../shared/infrastructure/winston/config';
import { DomainEventClass } from '../../../../shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/event/DomainEventSubscriber';
import { SpotifyUserLastTracksUpdatedDomainEvent } from '../../../spotify-user-last-tracks/application/save-spotify-user-last-tracks/SpotifyUserLastTracksUpdatedDomainEvent';
import SpotifyUserLastTracksUpdatedEmotionSongRecommenderUpdater from './SpotifyUserLastTracksUpdatedEmotionSongRecommenderUpdater';

export default class UpdateEmotionSongRecommenderOnSpotifyUserLastTracksUpdated
	implements DomainEventSubscriber<SpotifyUserLastTracksUpdatedDomainEvent>
{
	constructor(
		private readonly updater: SpotifyUserLastTracksUpdatedEmotionSongRecommenderUpdater
	) {}

	subscribedTo(): DomainEventClass[] {
		return [SpotifyUserLastTracksUpdatedDomainEvent];
	}

	async on(_: SpotifyUserLastTracksUpdatedDomainEvent): Promise<void> {
		logger.warn('UpdateEmotionSongRecommenderOnSpotifyUserLastTracksUpdated');
		logger.warn(_);

		const params = {
			spotifyUserId: _.aggregateId,
			lastTracks: _.lastTracks
		};
		await this.updater.run({ params });
	}

	queueName(): string {
		return 'andergi.backoffice.emotion-song-recommender.update_emotion_song_recommender_on_spotify_user_last_tracks_updated';
	}
}
