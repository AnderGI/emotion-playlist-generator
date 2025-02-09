import logger from '../../../../../shared/infrastructure/winston/config';
import UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand from '../../application/update-when-user-logged-in/UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand';
import EmotionSongRecommender from '../EmotionSongRecommender';
import { EmotionSongRecommenderRepository } from '../EmotionSongRecommenderRepository';

export default class SpotifyUserLoggedInEmotionSongRecommenderSaver {
	public static run(repository: EmotionSongRecommenderRepository) {
		return async (
			command: UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand
		): Promise<void> => {
			logger.info('DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater#run');
			const emotionSongRecommender = new EmotionSongRecommender(
				command.params.spotifyUserId,
				command.params.spotifyUserMail,
				null
			);

			logger.info('DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater before calling save');
			const aggregate = await repository.search(emotionSongRecommender);

			// Si no existe el 'aggregate', guarda el nuevo objeto
			if (!aggregate) {
				await repository.save(emotionSongRecommender);
			} else {
				aggregate.spotifyUserMail = emotionSongRecommender.spotifyUserMail;
				await repository.save(aggregate);
			}
		};
	}
}
