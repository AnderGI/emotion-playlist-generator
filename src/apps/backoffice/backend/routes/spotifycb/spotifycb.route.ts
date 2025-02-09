import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import querystring from 'querystring';

import config from '../../../../../contexts/shared/infrastructure/convict/config/config';

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
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	router.get('/spotifycb', async (req: Request, res: Response) => {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
		const code = req.query.code as string;
		const receivedState = req.query.state as string;

		if (!code || !receivedState) {
			res.status(httpStatus.BAD_REQUEST).json({ error: 'missing code or state' });

			return;
		}

		const generatedStatus = fs.readFileSync(
			config.get('spotify.stateFile') as unknown as string,
			'utf-8'
		);

		if (generatedStatus !== receivedState) {
			res.status(httpStatus.FORBIDDEN).json({ error: 'state mismatch error' });

			return;
		}

		// Request an access token
		const authOptions = {
			grant_type: config.get('spotify.grantType') as unknown as string,
			code,
			redirect_uri: config.get('spotify.redirectUri') as unknown as string
		};

		// request access token
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
		// eslint-disable-next-line camelcase
		const { access_token, refresh_token } = json;
		const userData = await fetch('https://api.spotify.com/v1/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${json.access_token}`
			}
		});
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const user: SpotifyCurrentUserData = await userData.json();
		// eslint-disable-next-line camelcase
		const { email, display_name, id } = user;
		// Carga las claves
		const privateKey = fs.readFileSync(
			config.get('system.privateKey') as unknown as string,
			'utf8'
		);
		const token = jwt.sign(
			// eslint-disable-next-line camelcase
			{ email, display_name, access_token, id },
			privateKey,
			{
				algorithm: 'RS256',
				expiresIn: '15 minutes'
			}
		);

		// call spotifyuserput route

		const dataForPut = {
			spotifyId: user.id,
			spotifyEmail: user.email,
			spotifyDisplayName: user.display_name,
			country: user.country,
			// eslint-disable-next-line camelcase
			refreshToken: refresh_token,
			// eslint-disable-next-line camelcase
			accessToken: access_token
		};
		// backend
		fetch(`http://localhost:3000/spotify-users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dataForPut)
		});

		res
			.cookie('access_token', token, {
				httpOnly: true,
				maxAge: 5 * 60 * 1 * 1000 // 15 min * 1000 ms
			})
			.redirect('http://localhost:3001/upload');
	});
};
