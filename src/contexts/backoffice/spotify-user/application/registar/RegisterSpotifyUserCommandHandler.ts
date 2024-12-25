import Command from '../../../../../shared/domain/command/Command';
import CommandHandler from '../../../../../shared/domain/command/CommandHandler';
import RegisterSpotifyUserCommand from './RegisterSpotifyUserCommand';
import SpotifyUserRegistar from './SpotifyUserRegistar';

export default class RegisterSpotifyUserCommandHandler
	implements CommandHandler<RegisterSpotifyUserCommand>
{
	constructor(private readonly spotifyUserRegistar: SpotifyUserRegistar) {}
	subscribedTo(): Command {
		return RegisterSpotifyUserCommand;
	}

	async handle(command: RegisterSpotifyUserCommand): Promise<void> {
		await this.spotifyUserRegistar.registar(command);
	}
}
