import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import logger from '../../../../../shared/infrastructure/winston/config';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import { SpotifyUserLoggedInDomainEvent } from '../../application/log-in/SpotifyUserLoggedInDomainEvent';
import SpotifyUser from '../SpotifyUser';
import { SpotifyUserRepository } from '../SpotifyUserRepository';

export default class SpotifyUserSaver {
	public static save(repository: SpotifyUserRepository, eventBus: EventBus) {
		return async (command: LogInSpotifyUserCommand): Promise<void> => {
			logger.info('SpotifyUserSaver#save');
			const spotifyUser = SpotifyUser.create(command);
			await repository.save(spotifyUser);
			const { spotifyId, spotifyEmail, spotifyDisplayName, country, refreshToken } = command.params;
			const event = new SpotifyUserLoggedInDomainEvent({
				aggregateId: spotifyId,
				spotifyEmail,
				spotifyDisplayName,
				country,
				refreshToken
			});
			logger.info('Created event before being published');
			logger.info(JSON.stringify(event));
			await eventBus.publish(event);
		};
	}
}
