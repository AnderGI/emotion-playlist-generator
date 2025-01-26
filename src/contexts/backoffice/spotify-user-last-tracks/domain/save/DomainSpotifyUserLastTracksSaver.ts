import SpotifyUserLastTracks, { SpotifyUserLastTracksPrimitives } from '../SpotifyUserLastTracks';
import SpotifyUserLastTracksRepository from '../SpotifyUserLastTracksRepository';

export default class DomainSpotifyUserLastTracksSaver {
	static async save(
		repository: SpotifyUserLastTracksRepository,
		spotifyUserPrimitives: SpotifyUserLastTracksPrimitives
	): Promise<void> {
		const userLastTracks = SpotifyUserLastTracks.fromPrimitives(spotifyUserPrimitives);
		await repository.save(userLastTracks);
	}
}
