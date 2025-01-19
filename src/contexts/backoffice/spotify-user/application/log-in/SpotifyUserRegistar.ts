import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import DomainSpotifyUserRegistar from '../../domain/registar/DomainSpotifyUserRegistar';
import { SpotifyUserRepository } from '../../domain/SpotifyUserRepository';

export default class SpotifyUserRegistar {
	constructor(
		private readonly userRepository: SpotifyUserRepository,
		private readonly eventBus: EventBus
	) {}

	public async run(command: LogInSpotifyUserCommand): Promise<void> {
		return DomainSpotifyUserRegistar.registar(this.userRepository, this.eventBus)(command);
	}
}
