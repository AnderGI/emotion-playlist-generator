import cookieParser from 'cookie-parser';
import * as crypto from 'crypto';
import express from 'express';
import * as fs from 'fs';
import * as fsprom from 'fs/promises';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import querystring from 'querystring';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cookieParser());

// Configuración de Spotify
const clientId = '787dd00a52634cc3afeb85ed7b6cf221';
const clientSecret = '87ad55ce02ef4606b8d0d7a1a7129beb';
const redirectUri = 'http://localhost:3000/spotifycb';

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

app.get('/', (req, res) => {
	res.status(httpStatus.FOUND).redirect('/login');

	return;
});

app.get('/login', (req, res) => {
	res.status(httpStatus.FOUND).redirect('/auth');

	return;
});

// Request User Authorization
app.get('/auth', (req, res) => {
	const state = crypto.randomBytes(16).toString('hex');
	const query = querystring.stringify({
		response_type: 'code',
		client_id: clientId,
		scope: 'user-read-private user-read-email',
		redirect_uri: redirectUri,
		state
	});
	fsprom.writeFile('top-secret.txt', state, 'utf-8');
	res.redirect(`https://accounts.spotify.com/authorize?${query}`);
});

// Endpoint raíz
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/spotifycb', async (req, res) => {
	const code = req.query.code as string;
	const receivedState = req.query.state as string;
	if (!code || !receivedState) {
		res.status(httpStatus.BAD_REQUEST).json({ error: 'missing code or state' });

		return;
	}

	const generatedStatus = fs.readFileSync('top-secret.txt', 'utf-8');

	if (generatedStatus !== receivedState) {
		res.status(httpStatus.FORBIDDEN).json({ error: 'state mismatch error' });

		return;
	}

	// Request an access token
	const authOptions = {
		grant_type: 'authorization_code',
		code,
		redirect_uri: redirectUri
	};

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
	// eslint-disable-next-line camelcase
	const { access_token } = json;
	const userData = await fetch('https://api.spotify.com/v1/me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${json.access_token}`
		}
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const user: SpotifyCurrentUserData = await userData.json();
	// eslint-disable-next-line camelcase
	const { email, display_name } = user;
	// Carga las claves
	const privateKey = fs.readFileSync('config/jwt/private.pem', 'utf8');
	const token = jwt.sign(
		// eslint-disable-next-line camelcase
		{ email, display_name, access_token },
		privateKey,
		{
			algorithm: 'RS256',
			expiresIn: '15 minutes'
		}
	);
	res
		.cookie('access_token', token, {
			sameSite: 'strict',
			httpOnly: true,
			maxAge: 15 * 1000 // 15 min * 1000 ms
		})
		.redirect('/app');
});

app.get('/app', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const token = req.cookies.access_token as unknown as string;
	const publicKey = fs.readFileSync('config/jwt/public.pem', 'utf8');
	try {
		const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
		res.json({ mssg: 'secure /app path', cookies: req.cookies as unknown as string, decoded });
	} catch {
		res.redirect('/login');
	}
});

// Inicia el servidor
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
