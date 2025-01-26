import { Nullable } from '../../../../../shared/domain/Nullable';
import logger from '../../../../../shared/infrastructure/winston/config';
import SpotifyUserLastTracks from '../SpotifyUserLastTracks';
import SpotifyUserLastTracksRepository from '../SpotifyUserLastTracksRepository';

export default class DomainSpotifyUserLastTracksSearcher {
	static async search(
		repository: SpotifyUserLastTracksRepository,
		aggregateId: string
	): Promise<Nullable<SpotifyUserLastTracks>> {
		logger.info('--- DomainSpotifyUserLastTracksSearcher#search');
		logger.info('--- aggregate');
		logger.info(aggregateId);

		return await repository.search(aggregateId);
	}
}
