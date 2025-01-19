import CommandBus from '../../../../../shared/domain/command/CommandBus';
import { Controller } from '../../../../../shared/domain/Controller';
import LogInSpotifyUserCommand from './LogInSpotifyUserCommand';
import SpotifyUserData from './SpotifyUserData';

export default class SpotifyUserPutController implements Controller<SpotifyUserData> {
	constructor(private readonly commandBus: CommandBus) {}
	run(req: SpotifyUserData): void {
		const command = new LogInSpotifyUserCommand(req);
		this.commandBus.dispatch(command);
	}
}
