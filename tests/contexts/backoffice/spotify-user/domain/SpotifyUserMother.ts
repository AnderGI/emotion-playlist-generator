import LogInSpotifyUserCommand from '../../../../../src/apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import SpotifyUser from '../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class SpotifyUserMother {
	static fromCommand(command: LogInSpotifyUserCommand): SpotifyUser {
		const { spotifyId, spotifyDisplayName, spotifyEmail, country } = command.params;

		return SpotifyUser.fromPrimitives({
			spotifyId,
			spotifyEmail,
			spotifyDisplayName,
			country
		});
	}
}
