/* eslint-disable camelcase */
/* eslint-disable unused-imports/no-unused-vars */
import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import { SpotifyUserLoggedInDomainEvent } from '../../application/log-in/SpotifyUserLoggedInDomainEvent';
import SpotifyUser from '../SpotifyUser';
import { SpotifyUserRepository } from '../SpotifyUserRepository';

export default class DomainSpotifyUserRegistar {
	public static registar(spotifyUserRepository: SpotifyUserRepository, eventBus: EventBus) {
		return async (command: LogInSpotifyUserCommand): Promise<void> => {
			const spotifyUser = SpotifyUser.create(command);
			await spotifyUserRepository.save(spotifyUser);
			const {
				uuid,
				spotify_id,
				spotify_email,
				spotify_display_name,
				spotify_product,
				spotify_uri,
				spotify_type,
				country,
				refresh_token
			} = spotifyUser.toPrimitives();
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
						refresh_token
					}
				})
			);
		};
	}
}
