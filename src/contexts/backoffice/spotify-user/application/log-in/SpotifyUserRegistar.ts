import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import logger from '../../../../../shared/infrastructure/winston/config';
import { EventBus } from '../../../../shared/domain/event/EventBus';
import DomainSpotifyUserRegistar from '../../domain/registar/DomainSpotifyUserRegistar';
import { SpotifyUserRepository } from '../../domain/SpotifyUserRepository';

export default class SpotifyUserRegistar {
	constructor(
		private readonly userRepository: SpotifyUserRepository,
		private readonly eventBus: EventBus
	) {}

	public async run(command: LogInSpotifyUserCommand): Promise<void> {
		logger.info('--- Application SpotifyUserRegistar');
		logger.info('--- command');
		logger.info(JSON.stringify(command, null, 2));

		return DomainSpotifyUserRegistar.registar(this.userRepository, this.eventBus)(command);
	}
}
