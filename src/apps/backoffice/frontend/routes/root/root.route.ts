import { Request, Response, Router } from 'express';
import path from 'node:path';

export const register = (router: Router): void => {
	router.get('/', (req: Request, res: Response) => {
		res.sendFile(path.join(__dirname, '..', '..', '/public/login.html'));
	});
};
