import logger from '../../../../../shared/infrastructure/winston/config';
import DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater from '../../domain/DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater';
import { EmotionSongRecommenderRepository } from '../../domain/EmotionSongRecommenderRepository';
import UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand from './UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand';

export default class OnSpotifyUserLoggedInEmotionSongRecommenderUpdater {
	constructor(
		private readonly repository: EmotionSongRecommenderRepository // private readonly eventBus: EventBus
	) {}

	public async run(
		command: UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand
	): Promise<void> {
		logger.info('OnSpotifyUserLoggedInEmotionSongRecommenderUpdater#run');
		await DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater.run(this.repository)(command);
	}
}
