import * as crypto from 'crypto';
import express from 'express';
import * as fs from 'fs/promises';
import httpStatus from 'http-status';
import querystring from 'querystring';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Configuración de Spotify
const clientId = '787dd00a52634cc3afeb85ed7b6cf221';
const clientSecret = '87ad55ce02ef4606b8d0d7a1a7129beb';
const redirectUri = 'http://localhost:3000';

type SpotiFySuccesAuthResponse = {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
	refresh_token: string;
};
// Endpoint raíz
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/', async (req, res) => {
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
		grant_type: 'authorization_code',
		code,
		redirect_uri: redirectUri
	};
	// get token
	const data = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
		},
		body: querystring.stringify(authOptions)
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const json: SpotiFySuccesAuthResponse = await data.json();

	res.json(json);
});

// Endpoint para iniciar la autenticación con Spotify
app.get('/auth', (req, res) => {
	const state = crypto.randomBytes(16).toString('hex');
	const query = querystring.stringify({
		response_type: 'code',
		client_id: clientId,
		scope: 'user-read-private user-read-email',
		redirect_uri: redirectUri,
		state
	});
	fs.writeFile('top-secret.txt', state, 'utf-8').catch(err => console.log(err));

	res.redirect(`https://accounts.spotify.com/authorize?${query}`);
});

// Inicia el servidor
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
