import { EventBus } from '../../../../shared/domain/event/EventBus';
import SpotifyUser from '../../domain/SpotifyUser';
import { SpotifyUserRepository } from '../../domain/SpotifyUserRepository';
import RegistarSpotifyUserCommand from './RegisterSpotifyUserCommand';
import SpotifyUserRegisteredDomainEvent from './SpotifyUserRegisteredDomainEvent';

export default class SpotifyUserRegistar {
	constructor(
		private readonly spotifyUserRepository: SpotifyUserRepository,
		private readonly eventBus: EventBus
	) {}

	public async registar(command: RegistarSpotifyUserCommand): Promise<void> {
		const { id, country, displayName, email } = command;
		const spotifyUser = SpotifyUser.fromPrimitives({ id, country, displayName, email });
		await this.spotifyUserRepository.register(spotifyUser);
		await this.eventBus.publish(
			SpotifyUserRegisteredDomainEvent.fromPrimitives({
				aggregateId: id,
				attributes: {
					spotifyUserCountry: country,
					spotifyUserDisplayName: displayName,
					spotifyUserEmail: email
				}
			})
		);
	}
}
