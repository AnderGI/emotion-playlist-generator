import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

export const register = (router: Router): void => {
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	router.get('/login', (req: Request, res: Response) => {
		res.status(httpStatus.FOUND).redirect('http://localhost:3000/auth');

		return;
	});
};
