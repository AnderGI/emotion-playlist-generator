import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

export const register = (router: Router): void => {
	// const controller = container.get<StatusGetController>(
	// 	'apps.backoffice.frontend.StatusGetController'
	// );
	router.get('/', (req: Request, res: Response) => {
		const token = req.cookies.access_token as unknown as string;
		if (!token) {
			console.log('----- / no access token');
			res.status(httpStatus.SEE_OTHER).redirect('/register');

			return;
		}
		console.log('----- / with access token');
		res.status(httpStatus.OK).redirect('/dashboard');
	});
};
