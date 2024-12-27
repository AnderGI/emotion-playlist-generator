import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

export const register = (router: Router): void => {
	// const controller = container.get<StatusGetController>('apps.backoffice.StatusGetController');
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	router.get('/login', (req: Request, res: Response) => {
		res.status(httpStatus.FOUND).redirect('/auth');

		return;
	});
};
