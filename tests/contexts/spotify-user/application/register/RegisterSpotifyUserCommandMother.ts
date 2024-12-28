import RegisterSpotifyUserCommand from '../../../../../src/contexts/backoffice/spotify-user/application/registar/RegisterSpotifyUserCommand';
import SpotifyUser from '../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class RegisterSpotifyUserCommandMother {
	static fromUser(spotifyUser: SpotifyUser): RegisterSpotifyUserCommand {
		const { id, country, email, displayName, ipAddress, accessToken, refreshToken } =
			spotifyUser.toPrimitives();

		return new RegisterSpotifyUserCommand(
			id,
			country,
			displayName,
			email,
			ipAddress,
			accessToken,
			refreshToken
		);
	}
}
