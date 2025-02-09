import { Nullable } from '../../../../../shared/domain/Nullable';
import SpotifyUserLastTracks from '../SpotifyUserLastTracks';
import SpotifyUserLastTracksRepository from '../SpotifyUserLastTracksRepository';

export default class SpotifyUserLastTracksSearcher {
	static async search(
		repository: SpotifyUserLastTracksRepository,
		aggregateId: string
	): Promise<Nullable<SpotifyUserLastTracks>> {
		return await repository.search(aggregateId);
	}
}
