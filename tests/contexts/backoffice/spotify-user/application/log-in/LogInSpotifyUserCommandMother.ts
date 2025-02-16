import { randomBytes } from 'crypto';
import fakerStatic from 'faker';

import LogInSpotifyUserCommand from '../../../../../../src/apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';

export class LogInSpotifyUserCommandMother {
	static create(): LogInSpotifyUserCommand {
		const name = fakerStatic.name.firstName();
		const params = {
			spotifyId: name,
			spotifyEmail: fakerStatic.internet.email(),
			spotifyDisplayName: name,
			country: fakerStatic.address.countryCode('ISO 3166-1 alpha-2'),
			refreshToken: randomBytes(64).toString('hex')
		};

		return new LogInSpotifyUserCommand(params);
	}
}
