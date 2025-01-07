import { Response } from 'express';

import CommandBus from '../../../../../shared/domain/command/CommandBus';
import { Controller } from '../../../../../shared/domain/Controller';
import SubmitImageCommand from './CreateImageCommand';
import SubmitImageReq from './CreateImageReq';

export default class ImagePutController implements Controller<SubmitImageReq> {
	constructor(private readonly commandBus: CommandBus) {}
	async run(req: SubmitImageReq, res: Response): Promise<void> {
		await this.commandBus.dispatch(SubmitImageCommand.create(req));
		res.status(201).send();
	}
}
