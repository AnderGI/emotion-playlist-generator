import CommandBus from '../../../../../shared/domain/command/CommandBus';
import { Controller } from '../../../../../shared/domain/Controller';
import logger from '../../../../../shared/infrastructure/winston/config';
import LogInSpotifyUserCommand from './LogInSpotifyUserCommand';
import SpotifyUserData from './SpotifyUserData';

export default class SpotifyUserPutController implements Controller<SpotifyUserData> {
	constructor(private readonly commandBus: CommandBus) {}
	run(req: SpotifyUserData): void {
		logger.http('--- SpotifyUserPutController Request');
		logger.info('--- Data');
		logger.info(JSON.stringify(req, null, 2));
		const command = new LogInSpotifyUserCommand(req);
		logger.info('--- Created LogInSpotifyUserCommand');
		logger.info(JSON.stringify(command, null, 2));
		this.commandBus.dispatch(command);
	}
}
