import { EventBus } from '../../../../shared/domain/event/EventBus';
import DomainSpotifyUserRegistar from '../../domain/registar/DomainSpotifyUserRegistar';
import { SpotifyUserRepository } from '../../domain/SpotifyUserRepository';
import RegistarSpotifyUserCommand from './RegisterSpotifyUserCommand';

export default class SpotifyUserRegistar {
	constructor(
		private readonly spotifyUserRepository: SpotifyUserRepository,
		private readonly eventBus: EventBus
	) {}

	public async registar(command: RegistarSpotifyUserCommand): Promise<void> {
		await DomainSpotifyUserRegistar.registar(this.spotifyUserRepository, this.eventBus)(command);
	}
}
