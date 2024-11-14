import { Request, Response, Router } from 'express';

import StatusGetController from '../controllers/status-health-check/StatusGetController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
	const controller = container.get<StatusGetController>('apps.backoffice.StatusGetController');
	router.get('/status', (req: Request, res: Response) => {
		controller.run(req, res);
	});
};
