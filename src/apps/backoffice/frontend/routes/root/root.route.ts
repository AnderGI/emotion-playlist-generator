import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

export const register = (router: Router): void => {
	router.get('/', (req: Request, res: Response) => {
		const token = req.cookies.access_token as unknown as string;
		if (!token) {
			res.status(httpStatus.SEE_OTHER).redirect('/register');

			return;
		}
		res.status(httpStatus.SEE_OTHER).redirect('/dashboard');
	});
};
