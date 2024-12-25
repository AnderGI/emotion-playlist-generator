import { Request, Response, Router } from 'express';
import * as fs from 'fs/promises';
import httpStatus from 'http-status';
import querystring from 'querystring';

import config from '../../../../contexts/shared/infrastructure/convict/config/config';

type SpotiFySuccesAuthResponse = {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
	refresh_token: string;
};

type SpotifyCurrentUserData = {
	country: 'string';
	display_name: 'string';
	email: 'string';
	explicit_content: {
		filter_enabled: false;
		filter_locked: false;
	};
	external_urls: {
		spotify: 'string';
	};
	followers: {
		href: 'string';
		total: 0;
	};
	href: 'string';
	id: 'string';
	images: [
		{
			url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228';
			height: 300;
			width: 300;
		}
	];
	product: 'string';
	type: 'string';
	uri: 'string';
};

export const register = (router: Router): void => {
	// const controller = container.get<StatusGetController>('apps.backoffice.StatusGetController');
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	router.get('/', async (req: Request, res: Response) => {
		const code = req.query.code as string;
		const receivedState = req.query.state as string;

		if (!code || !receivedState) {
			res.status(httpStatus.FOUND).redirect('/auth');

			return;
		}

		const stateData = await fs.readFile('top-secret.txt', 'utf-8');
		await fs.rm('top-secret.txt');
		if (stateData !== receivedState) {
			res.status(httpStatus.FORBIDDEN).json({ error: 'state mismatch error' });

			return;
		}

		const authOptions = {
			grant_type: config.get('spotify.grantType') as unknown as string,
			code,
			redirect_uri: config.get('spotify.redirectUri') as unknown as string
		};
		// get token
		const data = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${config.get('spotify.clientId') as unknown as string}:${
						config.get('spotify.clientSecret') as unknown as string
					}`
				).toString('base64')}`
			},
			body: querystring.stringify(authOptions)
		});
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const json: SpotiFySuccesAuthResponse = await data.json();

		// get user information

		const userData = await fetch('https://api.spotify.com/v1/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${json.access_token}`
			}
		});
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const user: SpotifyCurrentUserData = await userData.json();
		res.json(user);
	});
};
