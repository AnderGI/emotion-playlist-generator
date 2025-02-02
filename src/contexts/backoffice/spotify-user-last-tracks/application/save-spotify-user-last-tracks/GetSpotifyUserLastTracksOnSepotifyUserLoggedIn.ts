import logger from '../../../../../shared/infrastructure/winston/config';
import { DomainEventClass } from '../../../../shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/event/DomainEventSubscriber';
import { SpotifyUserLoggedInDomainEvent } from '../../../spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand, {
	GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandData
} from './GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';
import SpotifyUserLastTracksSaver from './SpotifyUserLastTracksSaver';

export default class GetSpotifyUserLastTracksOnSepotifyUserLoggedIn
	implements DomainEventSubscriber<SpotifyUserLoggedInDomainEvent>
{
	constructor(private readonly spotifyUserLastTracksRetriever: SpotifyUserLastTracksSaver) {}

	subscribedTo(): DomainEventClass[] {
		return [SpotifyUserLoggedInDomainEvent];
	}

	async on(domainEvent: SpotifyUserLoggedInDomainEvent): Promise<void> {
		logger.info('--- GetSpotifyUserLastTracksOnSepotifyUserLoggedIn#on');
		logger.info('--- Received SpotifyUserLoggedInDomainEvent');
		logger.info(JSON.stringify(domainEvent.toPrimitives(), null, 2));

		const data: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandData = {
			spotifyEmail: domainEvent.spotifyEmail,
			spotifyDisplayName: domainEvent.spotifyDisplayName,
			country: domainEvent.country,
			accessToken: domainEvent.accessToken,
			aggregateId: domainEvent.aggregateId
		};

		logger.info('--- GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandData');
		logger.info(JSON.stringify(data, null, 2));

		await this.spotifyUserLastTracksRetriever.run(
			new GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand(data)
		);
	}

	queueName(): string {
		return 'andergi.backoffice.spotify-user-last-tracks.get_users_last_tracks_on_spotify_user_logged_in';
	}
}
