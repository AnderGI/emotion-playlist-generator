import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export const authJwt = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.cookies.access_token as string;
	if (!token) {
		res.status(httpStatus.FORBIDDEN).redirect('http://localhost:3001/register');

		return;
	}

	next();
};
