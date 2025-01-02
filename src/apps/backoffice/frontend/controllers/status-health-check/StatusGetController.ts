import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from '../../../../../shared/domain/Controller';

export default class StatusGetController implements Controller<Request> {
	run(req: Request, res: Response): void {
		res.status(httpStatus.OK).send();
	}
}
