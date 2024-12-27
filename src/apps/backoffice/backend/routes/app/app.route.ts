import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

import config from '../../../../../contexts/shared/infrastructure/convict/config/config';

export const register = (router: Router): void => {
	// const controller = container.get<StatusGetController>('apps.backoffice.StatusGetController');
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	router.get('/app', (req: Request, res: Response) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const token = req.cookies.access_token as unknown as string;
		const publicKey = fs.readFileSync(config.get('system.publicKey') as unknown as string, 'utf8');
		try {
			const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
			res.json({ mssg: 'secure /app path', cookies: req.cookies as unknown as string, decoded });
		} catch {
			res.redirect('/login');
		}
	});
};
