/* eslint-disable camelcase */

import LogInSpotifyUserCommand from '../../../../../../src/apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import { SpotifyUserLoggedInDomainEvent } from '../../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';

export class SpotifyUserLoggedInDomainEventMother {
	static fromCommand(command: LogInSpotifyUserCommand): SpotifyUserLoggedInDomainEvent {
		const { spotifyId, spotifyEmail, spotifyDisplayName, country, refreshToken } = command.params;

		return new SpotifyUserLoggedInDomainEvent({
			aggregateId: spotifyId,
			spotifyEmail,
			spotifyDisplayName,
			country,
			refreshToken
		});
	}
}
