import LogInSpotifyUserCommand from '../../../../../src/apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import SpotifyUser from '../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class RegisterSpotifyUserCommandMother {
	static fromUser(spotifyUser: SpotifyUser): LogInSpotifyUserCommand {
		return new LogInSpotifyUserCommand(spotifyUser.toPrimitives());
	}
}
