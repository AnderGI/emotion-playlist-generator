import SpotifyUserRegisteredDomainEvent from '../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserRegisteredDomainEvent';
import SpotifyUser from '../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class SpotifyUserRegisteredDomainEventMother {
	static fromSpotifyUser(spotifyUser: SpotifyUser): SpotifyUserRegisteredDomainEvent {
		const {
			id,
			spotifyDisplayName,
			spotifyUri,
			spotifyMail,
			accessToken,
			refreshToken,
			productType,
			countryCode,
			ipAddress
		} = spotifyUser.toPrimitives();

		return SpotifyUserRegisteredDomainEvent.fromPrimitives({
			aggregateId: id,
			attributes: {
				spotifyDisplayName,
				spotifyUri,
				spotifyMail,
				accessToken,
				refreshToken,
				productType,
				countryCode,
				ipAddress
			}
		});
	}
}
