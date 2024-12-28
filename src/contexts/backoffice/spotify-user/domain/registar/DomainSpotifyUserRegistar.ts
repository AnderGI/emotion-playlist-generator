import { EventBus } from '../../../../shared/domain/event/EventBus';
import RegisterSpotifyUserCommand from '../../application/registar/RegisterSpotifyUserCommand';
import SpotifyUserRegisteredDomainEvent from '../../application/registar/SpotifyUserRegisteredDomainEvent';
import SpotifyUser from '../SpotifyUser';
import { SpotifyUserRepository } from '../SpotifyUserRepository';

export default class DomainSpotifyUserRegistar {
	public static registar(spotifyUserRepository: SpotifyUserRepository, eventBus: EventBus) {
		return async (command: RegisterSpotifyUserCommand): Promise<void> => {
			const spotifyUser = SpotifyUser.create(command);
			await spotifyUserRepository.save(spotifyUser);
			await eventBus.publish(
				SpotifyUserRegisteredDomainEvent.fromPrimitives({
					aggregateId: spotifyUser.id,
					attributes: {
						spotifyUserCountry: spotifyUser.country,
						spotifyUserDisplayName: spotifyUser.displayName,
						spotifyUserEmail: spotifyUser.email,
						spotifyUserIpAddress: spotifyUser.ipAddress,
						spotifyUserAccessToken: spotifyUser.accessToken,
						spotifyUserRefreshToken: spotifyUser.refreshToken
					}
				})
			);
		};
	}
}
