import express from 'express';
import fetch from 'node-fetch';
import querystring from 'querystring';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Configuración de Spotify
const clientId = process.env.SPOTIFY_CLIENT_ID ?? '787dd00a52634cc3afeb85ed7b6cf221';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? '4fe31cd870e840c4b4cf023a9553a57e';
const redirectUri = process.env.SPOTIFY_REDIRECT_URI ?? 'http://localhost:3000/spoti';

let accessToken = '';
let refreshToken = '';

// Endpoint para iniciar la autenticación con Spotify
app.get('/login', (req, res) => {
	const queryString = querystring.stringify({
		response_type: 'code',
		client_id: clientId,
		scope: 'user-top-read',
		redirect_uri: redirectUri
	});

	res.redirect(`https://accounts.spotify.com/authorize?${queryString}`);
});

// Endpoint para manejar la redirección de Spotify y obtener los tokens
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/spoti', async (req, res) => {
	const code = req.query.code as string;

	if (!code) {
		return res.status(400).send('Authorization code is required');
	}

	try {
		// Solicita el access_token y refresh_token a Spotify
		const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
			},
			body: querystring.stringify({
				code,
				redirect_uri: redirectUri,
				grant_type: 'authorization_code'
			})
		});

		if (!tokenResponse.ok) {
			throw new Error(`Failed to fetch token: ${tokenResponse.statusText}`);
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const tokenData = await tokenResponse.json();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		accessToken = tokenData.access_token;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		refreshToken = tokenData.refresh_token;

		console.log('Access Token:', accessToken);
		console.log('Refresh Token:', refreshToken);

		res.send('Authentication successful! You can now use the API.');
	} catch (error) {
		console.error('Error fetching tokens:', error);
		res.status(500).send('Failed to fetch tokens from Spotify');
	}
});

// Endpoint para obtener información del usuario con el Access Token
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/user', async (req, res) => {
	if (!accessToken) {
		return res.status(401).send('Access token is not available. Authenticate first.');
	}

	try {
		// Solicita información del usuario desde la API de Spotify
		const userResponse = await fetch('https://api.spotify.com/v1/me/top/tracks', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (!userResponse.ok) {
			throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const userData = await userResponse.json();
		console.log('User Data:', userData);

		res.json(userData); // Responde con los datos del usuario
	} catch (error) {
		console.error('Error fetching user data:', error);
		res.status(500).send('Failed to fetch user data from Spotify');
	}
});

// Inicia el servidor
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
