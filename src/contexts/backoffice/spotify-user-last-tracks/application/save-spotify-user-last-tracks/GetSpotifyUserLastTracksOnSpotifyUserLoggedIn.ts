import logger from '../../../../../shared/infrastructure/winston/config';
import { DomainEventClass } from '../../../../shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/event/DomainEventSubscriber';
import { SpotifyUserLoggedInDomainEvent } from '../../../spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from './GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';
import SpotifyUserLastTracksUpserter from './SpotifyUserLastTracksUpserter';

export default class GetSpotifyUserLastTracksOnSpotifyUserLoggedIn
	implements DomainEventSubscriber<SpotifyUserLoggedInDomainEvent>
{
	constructor(private readonly saver: SpotifyUserLastTracksUpserter) {}

	subscribedTo(): DomainEventClass[] {
		return [SpotifyUserLoggedInDomainEvent];
	}

	async on(_: SpotifyUserLoggedInDomainEvent): Promise<void> {
		logger.info('GetSpotifyUserLastTracksOnSpotifyUserLoggedIn#run');
		const data = {
			spotifyEmail: _.spotifyEmail,
			spotifyDisplayName: _.spotifyDisplayName,
			country: _.country,
			accessToken: _.accessToken,
			aggregateId: _.aggregateId
		};

		await this.saver.run(new GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand(data));
	}

	queueName(): string {
		return 'andergi.backoffice.spotify-user-last-tracks.get_users_last_tracks_on_spotify_user_logged_in';
	}
}
