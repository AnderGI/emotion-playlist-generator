/* eslint-disable camelcase */
import { SpotifyUserLoggedInDomainEvent } from '../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import SpotifyUser from '../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class SpotifyUserLoggedInDomainEventMother {
	static fromSpotifyUser(spotifyUser: SpotifyUser): SpotifyUserLoggedInDomainEvent {
		const {
			uuid,
			spotify_id,
			spotify_email,
			spotify_display_name,
			spotify_product,
			spotify_uri,
			spotify_type,
			country,
			refresh_token
		} = spotifyUser.toPrimitives();

		return SpotifyUserLoggedInDomainEvent.fromPrimitives({
			aggregateId: uuid,
			attributes: {
				spotify_id,
				spotify_email,
				spotify_display_name,
				spotify_product,
				spotify_uri,
				spotify_type,
				country,
				refresh_token
			}
		});
	}
}
