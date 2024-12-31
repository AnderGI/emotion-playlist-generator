import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import DomainSpotifyUserRegistar from '../../domain/registar/DomainSpotifyUserRegistar';
import { SpotifyUserRepository } from '../../domain/SpotifyUserRepository';

export default class SpotifyUserRegistar {
	constructor(
		private readonly spotifyUserRepository: SpotifyUserRepository,
		private readonly eventBus: EventBus
	) {}

	public async registar(command: LogInSpotifyUserCommand): Promise<void> {
		await DomainSpotifyUserRegistar.registar(this.spotifyUserRepository, this.eventBus)(command);
	}
}
