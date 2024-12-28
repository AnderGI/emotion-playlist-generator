import { EventBus } from '../../../../shared/domain/event/EventBus';
import RegisterSpotifyUserCommand from '../../application/registar/RegisterSpotifyUserCommand';
import SpotifyUserRegisteredDomainEvent from '../../application/registar/SpotifyUserRegisteredDomainEvent';
import SpotifyUser from '../SpotifyUser';
import { SpotifyUserRepository } from '../SpotifyUserRepository';

export default class DomainSpotifyUserRegistar {
	public static registar(spotifyUserRepository: SpotifyUserRepository, eventBus: EventBus) {
		return async (command: RegisterSpotifyUserCommand): Promise<void> => {
			const { id, country, displayName, email, spotifyUserAccessToken } = command;
			const spotifyUser = SpotifyUser.fromPrimitives({ id, country, displayName, email });
			await spotifyUserRepository.save(spotifyUser);
			await eventBus.publish(
				SpotifyUserRegisteredDomainEvent.fromPrimitives({
					aggregateId: id,
					attributes: {
						spotifyUserCountry: country,
						spotifyUserDisplayName: displayName,
						spotifyUserEmail: email,
						spotifyUserAccessToken
					}
				})
			);
		};
	}
}
