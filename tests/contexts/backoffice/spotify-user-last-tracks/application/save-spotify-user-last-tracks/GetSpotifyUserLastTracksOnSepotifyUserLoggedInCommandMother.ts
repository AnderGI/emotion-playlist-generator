import { SpotifyUserLoggedInDomainEvent } from '../../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from '../../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';

export class GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother {
	static fromEvent(
		event: SpotifyUserLoggedInDomainEvent
	): GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand {
		return new GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand({
			spotify_id: event.spotify_id,
			spotify_email: event.spotify_email,
			spotify_display_name: event.spotify_display_name,
			spotify_product: event.spotify_product,
			spotify_uri: event.spotify_uri,
			spotify_type: event.spotify_type,
			country: event.country,
			access_token: event.access_token,
			aggregateId: event.aggregateId
		});
	}
}
