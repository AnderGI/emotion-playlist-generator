import { Response } from 'express';

import CommandBus from '../../../../../shared/domain/command/CommandBus';
import { Controller } from '../../../../../shared/domain/Controller';
import CreateSpotifyUserReq from './CreateSpotifyUserReq';
import RegisterSpotifyUserCommand from './RegisterImageCommand';

export default class SpotifyUserPutController implements Controller {
	constructor(private readonly commandBus: CommandBus) {}
	async run(req: CreateSpotifyUserReq, res: Response): Promise<void> {
		const { id, country, displayName, email, cookies } = req;
		const { access_token: spotifyUserAccesToken } = cookies;
		await this.commandBus.dispatch(
			new RegisterSpotifyUserCommand(
				id,
				country,
				displayName,
				email,
				spotifyUserAccesToken as unknown as string
			)
		);
		res.status(201).send();
	}
}
