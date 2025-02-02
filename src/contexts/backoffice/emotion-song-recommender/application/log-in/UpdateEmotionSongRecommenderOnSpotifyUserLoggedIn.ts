import logger from '../../../../../shared/infrastructure/winston/config';
import { DomainEventClass } from '../../../../shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/event/DomainEventSubscriber';
import { SpotifyUserLoggedInDomainEvent } from '../../../spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import OnSpotifyUserLoggedInEmotionSongRecommenderUpdater from './OnSpotifyUserLoggedInEmotionSongRecommenderUpdater';
import UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand from './UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand';

export default class UpdateEmotionSongRecommenderOnSpotifyUserLoggedIn
	implements DomainEventSubscriber<SpotifyUserLoggedInDomainEvent>
{
	constructor(private readonly updater: OnSpotifyUserLoggedInEmotionSongRecommenderUpdater) {}

	subscribedTo(): DomainEventClass[] {
		return [SpotifyUserLoggedInDomainEvent];
	}

	async on(domainEvent: SpotifyUserLoggedInDomainEvent): Promise<void> {
		logger.info('UpdateEmotionSongRecommenderOnSpotifyUserLoggedInDomainEvent#on');
		logger.info(domainEvent);
		await this.updater.run(
			new UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand({
				spotifyUserId: domainEvent.aggregateId,
				spotifyUserMail: domainEvent.spotifyEmail
			})
		);
	}

	queueName(): string {
		return 'andergi.backoffice.emotion-song-recommender.update_emotion_song_recommender_on_spotify_user_logged_in';
	}
}
