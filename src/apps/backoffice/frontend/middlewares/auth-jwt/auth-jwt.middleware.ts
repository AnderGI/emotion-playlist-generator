import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'node:fs';

import config from '../../../../../contexts/shared/infrastructure/convict/config/config';

export const authJwt = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.cookies.access_token as string;
	if (!token) {
		res.redirect('/');

		return;
	}

	try {
		const publicKey = fs.readFileSync(config.get('system.publicKey') as string, 'utf8');
		jwt.verify(token, publicKey);
		next();

		return;
	} catch {
		res.redirect('/');

		return;
	}
};
