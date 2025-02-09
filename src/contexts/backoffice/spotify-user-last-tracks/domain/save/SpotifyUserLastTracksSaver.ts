import logger from '../../../../../shared/infrastructure/winston/config';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import { SpotifyUserLastTracksUpdatedDomainEvent } from '../../application/save-spotify-user-last-tracks/SpotifyUserLastTracksUpdatedDomainEvent';
import SpotifyUserLastTracks, { SpotifyUserLastTracksPrimitives } from '../SpotifyUserLastTracks';
import SpotifyUserLastTracksRepository from '../SpotifyUserLastTracksRepository';

export default class SpotifyUserLastTracksSaver {
	static save(repository: SpotifyUserLastTracksRepository, bus: EventBus) {
		return async (primitives: SpotifyUserLastTracksPrimitives): Promise<void> => {
			logger.info('SpotifyUserLastTracksSaver#save');
			const userLastTracks = SpotifyUserLastTracks.fromPrimitives(primitives);
			await repository.save(userLastTracks);
			const event = SpotifyUserLastTracksUpdatedDomainEvent.fromPrimitives({
				aggregateId: primitives.userId,
				attributes: {
					lastTracks: primitives.topTracks.toString()
				}
			});
			logger.info('Created event before being published');
			logger.info(JSON.stringify(event));
			await bus.publish(event);
		};
	}
}
