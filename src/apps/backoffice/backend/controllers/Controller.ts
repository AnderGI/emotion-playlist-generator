import { Response } from 'express';

import { ControllerRequest } from '../../../../contexts/backoffice/image/domain/ControllerRequest';

export interface Controller {
	run(req: ControllerRequest, res: Response): Promise<void> | void;
}
