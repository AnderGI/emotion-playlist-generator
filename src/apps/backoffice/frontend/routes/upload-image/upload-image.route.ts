import { Request, Response, Router } from 'express';
import path from 'path';

import { authJwt } from '../../middlewares/auth-jwt/auth-jwt.middleware';

export const register = (router: Router): void => {
	router.get('/upload', authJwt, (req: Request, res: Response) => {
		res.sendFile(path.join(__dirname, '..', '..', '/public/upload-image.html'));
	});
};
