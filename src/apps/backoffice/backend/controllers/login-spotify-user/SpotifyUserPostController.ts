import CommandBus from '../../../../../shared/domain/command/CommandBus';
import { Controller } from '../../../../../shared/domain/Controller';
import LogInSpotifyUserCommand from './LogInSpotifyUserCommand';
import SpotifyUserReq from './SpotifyUserReq';

export default class SpotifyUserPostController implements Controller<SpotifyUserReq> {
	constructor(private readonly commandBus: CommandBus) {}
	run(req: SpotifyUserReq): void {
		const command = new LogInSpotifyUserCommand(req);
		this.commandBus.dispatch(command);
	}
}
