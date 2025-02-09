import logger from '../../../../../shared/infrastructure/winston/config';
import EmotionSongRecommender from '../../domain/EmotionSongRecommender';
import { EmotionSongRecommenderRepository } from '../../domain/EmotionSongRecommenderRepository';
import UpdateEmotionSongRecommenderOnSpotifyUserLastTracksUpdatedCommand from './UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand';

export default class SpotifyUserLastTracksUpdatedEmotionSongRecommenderUpdater {
	constructor(private readonly repository: EmotionSongRecommenderRepository) {}
	public async run(
		command: UpdateEmotionSongRecommenderOnSpotifyUserLastTracksUpdatedCommand
	): Promise<void> {
		logger.info('OnSpotifyUserLoggedInEmotionSongRecommenderUpdater#run');
		const recommender = new EmotionSongRecommender(
			command.params.spotifyUserId,
			null,
			command.params.lastTracks
		);

		const aggregate = await this.repository.search(recommender);

		if (!aggregate) {
			await this.repository.save(recommender);
		} else {
			// Si existe, solo actualiza el mail por se rel campo null de la entidad creada no de la de bbdd
			aggregate.lastTracks = recommender.lastTracks;

			await this.repository.save(aggregate);
		}
	}
}
