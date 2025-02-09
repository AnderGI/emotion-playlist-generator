import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { EventBus } from '../../../shared/domain/event/EventBus';
import SpotifyUserLastTracksSaver from './save/SpotifyUserLastTracksSaver';
import SpotifyUserLastTracksSearcher from './search/SpotifyUserLastTracksSearcher';
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

	static upsert(repository: SpotifyUserLastTracksRepository, bus: EventBus) {
		return async (spotifyUserPrimitives: SpotifyUserLastTracksPrimitives): Promise<void> => {
			await SpotifyUserLastTracksSaver.save(repository, bus)(spotifyUserPrimitives);
		};
	}

	static search(repository: SpotifyUserLastTracksRepository) {
		return async (id: string): Promise<void> => {
			await SpotifyUserLastTracksSearcher.search(repository, id);
		};
	}

	tracksShouldBeUpdatedAfterThreeWeeks(): boolean {
		const threeWeekInMs = 3 * 7 * 24 * 60 * 60 * 1000;

		return Date.now() - this.updatedAt >= threeWeekInMs;
	}

	toPrimitives(): SpotifyUserLastTracksPrimitives {
		return {
			userId: this.userId,
			topTracks: this.topTracks,
			updatedAt: this.updatedAt
		};
	}
}
