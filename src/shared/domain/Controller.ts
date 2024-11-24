import { Response } from 'express';

import { ControllerRequest } from './ControllerRequest';

export interface Controller {
	run(req: ControllerRequest, res: Response): Promise<void> | void;
}
