import * as crypto from 'crypto';
import { Request, Response, Router } from 'express';
import * as fs from 'fs/promises';
import querystring from 'querystring';

import config from '../../../../../contexts/shared/infrastructure/convict/config/config';

// request user authorization
export const register = (router: Router): void => {
	router.get('/auth', (req: Request, res: Response) => {
		const state = crypto.randomBytes(16).toString('hex');
		const query = querystring.stringify({
			response_type: config.get('spotify.responseType') as unknown as string,
			client_id: config.get('spotify.clientId') as unknown as string,
			scope: config.get('spotify.scope') as unknown as string,
			redirect_uri: config.get('spotify.redirectUri') as unknown as string,
			state
		});

		fs.writeFile(config.get('spotify.stateFile') as unknown as string, state, 'utf-8');

		res.redirect(`${config.get('spotify.userAuthorizationUri') as unknown as string}?${query}`);
	});
};
