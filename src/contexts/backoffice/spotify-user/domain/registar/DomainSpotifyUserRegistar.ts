/* eslint-disable camelcase */
/* eslint-disable unused-imports/no-unused-vars */
import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import logger from '../../../../../shared/infrastructure/winston/config';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import { SpotifyUserLoggedInDomainEvent } from '../../application/log-in/SpotifyUserLoggedInDomainEvent';
import SpotifyUser from '../SpotifyUser';
import { SpotifyUserRepository } from '../SpotifyUserRepository';

export default class DomainSpotifyUserRegistar {
	public static registar(spotifyUserRepository: SpotifyUserRepository, eventBus: EventBus) {
		return async (command: LogInSpotifyUserCommand): Promise<void> => {
			logger.info('--- DomainSpotifyUserRegistar');
			logger.info('--- command');
			logger.info(JSON.stringify(command, null, 2));
			const spotifyUser = SpotifyUser.create(command);
			logger.info('--- Created Spotify user');
			logger.info(JSON.stringify(spotifyUser.toPrimitives(), null, 2));
			logger.info('--- Before calling spotifyUserRepository');
			await spotifyUserRepository.save(spotifyUser);
			logger.info('--- After calling spotifyUserRepository');
			const {
				uuid,
				spotify_id,
				spotify_email,
				spotify_display_name,
				spotify_product,
				spotify_uri,
				spotify_type,
				country,
				refresh_token,
				access_token
			} = spotifyUser.toPrimitives();
			logger.info('--- Before publishing SpotifyUserLoggedInDomainEvent');
			await eventBus.publish(
				SpotifyUserLoggedInDomainEvent.fromPrimitives({
					aggregateId: uuid,
					attributes: {
						spotify_id,
						spotify_email,
						spotify_display_name,
						spotify_product,
						spotify_uri,
						spotify_type,
						country,
						refresh_token,
						access_token
					}
				})
			);
			logger.info('--- After publishing SpotifyUserLoggedInDomainEvent');
		};
	}
}
