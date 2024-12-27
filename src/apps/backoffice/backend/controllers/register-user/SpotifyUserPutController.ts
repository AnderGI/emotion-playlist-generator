import { Response } from 'express';

import CommandBus from '../../../../../shared/domain/command/CommandBus';
import { Controller } from '../../../../../shared/domain/Controller';
import CreateSpotifyUserCommand from './CreateImageCommand';
import CreateSpotifyUserReq from './CreateSpotifyUserReq';

export default class SpotifyUserPutController implements Controller {
	constructor(private readonly commandBus: CommandBus) {}
	async run(req: CreateSpotifyUserReq, res: Response): Promise<void> {
		const { id, country, displayName, email } = req;
		await this.commandBus.dispatch(new CreateSpotifyUserCommand(id, country, displayName, email));
		res.status(201).send();
	}
}
