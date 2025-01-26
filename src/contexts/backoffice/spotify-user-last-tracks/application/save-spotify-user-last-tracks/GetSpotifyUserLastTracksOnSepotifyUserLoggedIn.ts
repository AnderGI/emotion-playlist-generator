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
		console.log('----- GetSpotifyUserLastTracksOnSepotifyUserLoggedIn');
		console.log(domainEvent);

		const data: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandData = {
			spotify_id: domainEvent.spotify_id,
			spotify_email: domainEvent.spotify_email,
			spotify_display_name: domainEvent.spotify_display_name,
			spotify_product: domainEvent.spotify_product,
			spotify_uri: domainEvent.spotify_uri,
			spotify_type: domainEvent.spotify_type,
			country: domainEvent.country,
			access_token: domainEvent.access_token,
			aggregateId: domainEvent.aggregateId
		};

		await this.spotifyUserLastTracksRetriever.run(
			new GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand(data)
		);
	}

	queueName(): string {
		return 'andergi.backoffice.spotify-user-last-tracks.get_users_last_tracks_on_spotify_user_logged_in';
	}
}
