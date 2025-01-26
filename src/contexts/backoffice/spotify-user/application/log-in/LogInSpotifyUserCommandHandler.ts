import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import Command from '../../../../../shared/domain/command/Command';
import CommandHandler from '../../../../../shared/domain/command/CommandHandler';
import logger from '../../../../../shared/infrastructure/winston/config';
import SpotifyUserRegistar from './SpotifyUserRegistar';

export default class LogInSpotifyUserCommandHandler
	implements CommandHandler<LogInSpotifyUserCommand>
{
	constructor(readonly spotifyUserRegistar: SpotifyUserRegistar) {}
	subscribedTo(): Command {
		return LogInSpotifyUserCommand;
	}

	async handle(command: LogInSpotifyUserCommand): Promise<void> {
		logger.info('--- LogInSpotifyUserCommandHandler');
		logger.info('--- Received command');
		logger.info(JSON.stringify(command, null, 2));
		await this.spotifyUserRegistar.run(command);
	}
}
