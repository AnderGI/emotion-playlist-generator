import { Nullable } from '../../../../shared/domain/Nullable';
import SpotifyUserLastTracks from './SpotifyUserLastTracks';

export default interface SpotifyUserLastTracksRepository {
	save(user: SpotifyUserLastTracks): Promise<void>;
	search(aggregateId: string): Promise<Nullable<SpotifyUserLastTracks>>;
}
