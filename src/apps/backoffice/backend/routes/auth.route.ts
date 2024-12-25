import * as crypto from 'crypto';
import { Request, Response, Router } from 'express';
import * as fs from 'fs/promises';
import querystring from 'querystring';

import config from '../../../../contexts/shared/infrastructure/convict/config/config';

type UserAuthorizationRequest = {
	response_type: string;
	client_id: string;
	scope: string;
	redirect_uri: string;
	state: string;
};
export const register = (router: Router): void => {
	// const controller = container.get<StatusGetController>('apps.backoffice.StatusGetController');
	router.get('/auth', (req: Request, res: Response) => {
		const state = crypto.randomBytes(16).toString('hex');
		const request: UserAuthorizationRequest = {
			response_type: config.get('spotify.responseType') as unknown as string,
			client_id: config.get('spotify.clientId') as unknown as string,
			scope: config.get('spotify.scope') as unknown as string,
			redirect_uri: config.get('spotify.redirectUri') as unknown as string,
			state
		};
		const query = querystring.stringify(request);
		fs.writeFile('top-secret.txt', state, 'utf-8').catch(err => console.log(err));

		res.redirect(`https://accounts.spotify.com/authorize?${query}`);
	});
};
