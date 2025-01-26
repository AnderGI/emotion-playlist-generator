import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import DomainSpotifyUserLastTracksSaver from './save/DomainSpotifyUserLastTracksSaver';
import SpotifyUserLastTracksRepository from './SpotifyUserLastTracksRepository';

export type SpotifyUserLastTracksPrimitives = {
	userId: string;
	topTracks: string[];
	updatedAt: number;
};

export default class SpotifyUserLastTracks implements AggregateRoot {
	constructor(
		public readonly userId: string,
		public topTracks: string[],
		public updatedAt: number
	) {}

	static fromPrimitives(primitives: SpotifyUserLastTracksPrimitives): SpotifyUserLastTracks {
		return new SpotifyUserLastTracks(primitives.userId, primitives.topTracks, primitives.updatedAt);
	}

	static save(repository: SpotifyUserLastTracksRepository) {
		return async (spotifyUserPrimitives: SpotifyUserLastTracksPrimitives): Promise<void> => {
			await DomainSpotifyUserLastTracksSaver.save(repository, spotifyUserPrimitives);
		};
	}

	toPrimitives(): SpotifyUserLastTracksPrimitives {
		return {
			userId: this.userId,
			topTracks: this.topTracks,
			updatedAt: this.updatedAt
		};
	}
}
