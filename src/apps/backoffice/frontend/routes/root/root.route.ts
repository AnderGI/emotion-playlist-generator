import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

import { authJwt } from '../../middlewares/auth-jwt/auth-jwt.middleware';

export const register = (router: Router): void => {
	router.get('/', authJwt, (req: Request, res: Response) => {
		res.status(httpStatus.SEE_OTHER).redirect('/dashboard');
	});
};
