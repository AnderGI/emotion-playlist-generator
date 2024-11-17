import { Response } from 'express';

import CommandBus from '../../../../../shared/domain/bus/command/CommandBus';
import { Controller } from '../Controller';
import CreateImageCommand from './CreateImageCommand';
import CreateImageReq from './CreateImageReq';

export default class ImagePutController implements Controller {
	constructor(private readonly commandBus: CommandBus) {}
	async run(req: CreateImageReq, res: Response): Promise<void> {
		const { id, path } = req;
		await this.commandBus.dispatch(new CreateImageCommand(id, path));
		res.status(201).send();
	}
}
