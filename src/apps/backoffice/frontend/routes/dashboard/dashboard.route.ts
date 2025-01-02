import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

export const register = (router: Router): void => {
	// const controller = container.get<StatusGetController>(
	// 	'apps.backoffice.frontend.StatusGetController'
	// );
	router.get('/dashboard', (req: Request, res: Response) => {
		res.status(httpStatus.OK).json({ mssg: 'dashboard protected page' });
	});
};
