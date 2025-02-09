/* eslint-disable camelcase */

import { SpotifyUserLoggedInDomainEvent } from '../../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import SpotifyUser from '../../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class SpotifyUserLoggedInDomainEventMother {
	static fromSpotifyUser(spotifyUser: SpotifyUser): SpotifyUserLoggedInDomainEvent {
		const { spotifyEmail, spotifyDisplayName, country, refreshToken, accessToken } =
			spotifyUser.toPrimitives();

		return new SpotifyUserLoggedInDomainEvent({
			aggregateId: spotifyUser.spotifyId.getValue(),
			spotifyEmail,
			spotifyDisplayName,
			country,
			refreshToken,
			accessToken
		});
	}
}
