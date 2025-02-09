import { Response } from 'express';
import httpStatus from 'http-status';

import CommandBus from '../../../../../shared/domain/command/CommandBus';
import { Controller } from '../../../../../shared/domain/Controller';
import logger from '../../../../../shared/infrastructure/winston/config';
import LogInSpotifyUserCommand from './LogInSpotifyUserCommand';
import LogInSpotifyUserReq from './LogInSpotifyUserReq';

export default class SpotifyUserPutController implements Controller<LogInSpotifyUserReq> {
	constructor(private readonly commandBus: CommandBus) {}
	run(req: LogInSpotifyUserReq, res: Response): void {
		logger.info('SpotifyUserPutController#run');
		const command = new LogInSpotifyUserCommand({
			id: req.id,
			spotifyDisplayName: req.spotifyDisplayName,
			spotifyUri: req.spotifyUri,
			spotifyMail: req.spotifyMail,
			accessToken: req.accessToken,
			refreshToken: req.refreshToken,
			productType: req.productType,
			countryCode: req.countryCode,
			ipAddress: req.ipAddress
		});
		this.commandBus.dispatch(command);
		res.status(httpStatus.CREATED).send();
	}
}
