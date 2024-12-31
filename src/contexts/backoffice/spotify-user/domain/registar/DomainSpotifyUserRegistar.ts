import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import SpotifyUserRegisteredDomainEvent from '../../application/log-in/SpotifyUserRegisteredDomainEvent';
import SpotifyUser from '../SpotifyUser';
import { SpotifyUserRepository } from '../SpotifyUserRepository';

export default class DomainSpotifyUserRegistar {
	public static registar(spotifyUserRepository: SpotifyUserRepository, eventBus: EventBus) {
		return async (command: LogInSpotifyUserCommand): Promise<void> => {
			const spotifyUser = SpotifyUser.create(command);
			await spotifyUserRepository.save(spotifyUser);
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
			await eventBus.publish(
				SpotifyUserRegisteredDomainEvent.fromPrimitives({
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
				})
			);
		};
	}
}
