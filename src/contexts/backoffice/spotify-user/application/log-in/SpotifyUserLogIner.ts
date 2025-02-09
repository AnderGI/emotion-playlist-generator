import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import SpotifyUserSaver from '../../domain/log-in/DomainSpotifyUserRegistar';
import { SpotifyUserRepository } from '../../domain/SpotifyUserRepository';

export default class SpotifyUserLogIner {
	constructor(
		private readonly repository: SpotifyUserRepository,
		private readonly eventBus: EventBus
	) {}

	public async run(command: LogInSpotifyUserCommand): Promise<void> {
		return SpotifyUserSaver.save(this.repository, this.eventBus)(command);
	}
}
