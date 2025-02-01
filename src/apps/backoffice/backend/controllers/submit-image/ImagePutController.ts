import { Response } from 'express';

import CommandBus from '../../../../../shared/domain/command/CommandBus';
import { Controller } from '../../../../../shared/domain/Controller';
import logger from '../../../../../shared/infrastructure/winston/config';
import SubmitImageCommand from './CreateImageCommand';
import SubmitImageReq from './CreateImageReq';

export default class ImagePutController implements Controller<SubmitImageReq> {
	constructor(private readonly commandBus: CommandBus) {}
	async run(req: SubmitImageReq, res: Response): Promise<void> {
		logger.info('ImagePutController#run');
		await this.commandBus.dispatch(SubmitImageCommand.create(req));
		res.status(201).send();

		return Promise.resolve();
	}
}
