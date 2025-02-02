import logger from '../../../../shared/infrastructure/winston/config';
import UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand from '../application/log-in/UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand';
import EmotionSongRecommender from './EmotionSongRecommender';
import { EmotionSongRecommenderRepository } from './EmotionSongRecommenderRepository';

export default class DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater {
	public static run(repository: EmotionSongRecommenderRepository) {
		return async (
			command: UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand
		): Promise<void> => {
			logger.info('DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater#run');
			const emotionSongRecommender = new EmotionSongRecommender(
				command.params.spotifyUserId,
				command.params.spotifyUserMail
			);
			logger.info('DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater before calling save');
			await repository.save(emotionSongRecommender);
		};
	}
}
