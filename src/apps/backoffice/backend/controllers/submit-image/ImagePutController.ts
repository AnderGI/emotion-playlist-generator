import { Response } from 'express';

import CommandBus from '../../../../../shared/domain/command/CommandBus';
import { Controller } from '../../../../../shared/domain/Controller';
import CreateImageCommand from './CreateImageCommand';
import CreateImageReq from './CreateImageReq';

export default class ImagePutController implements Controller {
	constructor(private readonly commandBus: CommandBus) {}
	async run(req: CreateImageReq, res: Response): Promise<void> {
		const { id, filename } = req;
		await this.commandBus.dispatch(new CreateImageCommand(id, filename));
		res.status(201).send();
	}
}
