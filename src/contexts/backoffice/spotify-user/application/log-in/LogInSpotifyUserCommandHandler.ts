import LogInSpotifyUserCommand from '../../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import Command from '../../../../../shared/domain/command/Command';
import CommandHandler from '../../../../../shared/domain/command/CommandHandler';
import SpotifyUserLogIner from './SpotifyUserLogIner';

export default class LogInSpotifyUserCommandHandler
	implements CommandHandler<LogInSpotifyUserCommand>
{
	constructor(readonly logIner: SpotifyUserLogIner) {}
	subscribedTo(): Command {
		return LogInSpotifyUserCommand;
	}

	async handle(command: LogInSpotifyUserCommand): Promise<void> {
		await this.logIner.run(command);
	}
}
