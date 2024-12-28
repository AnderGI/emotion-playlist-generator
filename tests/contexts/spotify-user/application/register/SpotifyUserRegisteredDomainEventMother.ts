import SpotifyUserRegisteredDomainEvent from '../../../../../src/contexts/backoffice/spotify-user/application/registar/SpotifyUserRegisteredDomainEvent';
import SpotifyUser from '../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class SpotifyUserRegisteredDomainEventMother {
	static fromSpotifyUser(
		spotifyUser: SpotifyUser,
		accesToken: string
	): SpotifyUserRegisteredDomainEvent {
		const { id, email, country, displayName } = spotifyUser.toPrimitives();

		return SpotifyUserRegisteredDomainEvent.fromPrimitives({
			aggregateId: id,
			attributes: {
				spotifyUserCountry: country,
				spotifyUserDisplayName: displayName,
				spotifyUserEmail: email,
				spotifyUserAccessToken: accesToken
			}
		});
	}
}
