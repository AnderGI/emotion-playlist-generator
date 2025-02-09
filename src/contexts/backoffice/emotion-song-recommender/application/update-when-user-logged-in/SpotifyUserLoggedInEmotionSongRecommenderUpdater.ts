import logger from '../../../../../shared/infrastructure/winston/config';
import { EmotionSongRecommenderRepository } from '../../domain/EmotionSongRecommenderRepository';
import SpotifyUserLoggedInEmotionSongRecommenderSaver from '../../domain/update-when-user-logged-in/SpotifyUserLoggedInEmotionSongRecommenderSaver';
import UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand from './UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand';

export default class SpotifyUserLoggedInEmotionSongRecommenderUpdater {
	constructor(private readonly repository: EmotionSongRecommenderRepository) {}

	public async run(
		command: UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand
	): Promise<void> {
		logger.info('OnSpotifyUserLoggedInEmotionSongRecommenderUpdater#run');
		await SpotifyUserLoggedInEmotionSongRecommenderSaver.run(this.repository)(command);
	}
}
