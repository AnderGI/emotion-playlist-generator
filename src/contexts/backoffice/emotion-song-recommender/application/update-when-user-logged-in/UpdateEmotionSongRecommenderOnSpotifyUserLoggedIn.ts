import logger from '../../../../../shared/infrastructure/winston/config';
import { DomainEventClass } from '../../../../shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/event/DomainEventSubscriber';
import { SpotifyUserLoggedInDomainEvent } from '../../../spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import SpotifyUserLoggedInEmotionSongRecommenderUpdater from './SpotifyUserLoggedInEmotionSongRecommenderUpdater';
import UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand from './UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand';

export default class UpdateEmotionSongRecommenderOnSpotifyUserLoggedIn
	implements DomainEventSubscriber<SpotifyUserLoggedInDomainEvent>
{
	constructor(private readonly updater: SpotifyUserLoggedInEmotionSongRecommenderUpdater) {}

	subscribedTo(): DomainEventClass[] {
		return [SpotifyUserLoggedInDomainEvent];
	}

	async on(domainEvent: SpotifyUserLoggedInDomainEvent): Promise<void> {
		logger.info('UpdateEmotionSongRecommenderOnSpotifyUserLoggedInDomainEvent#on');
		const command = new UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand({
			spotifyUserId: domainEvent.aggregateId,
			spotifyUserMail: domainEvent.spotifyEmail
		});

		await this.updater.run(command);
	}

	queueName(): string {
		return 'andergi.backoffice.emotion-song-recommender.update_emotion_song_recommender_on_spotify_user_logged_in';
	}
}
