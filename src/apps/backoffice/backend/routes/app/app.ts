// import { Request, Response, Router } from 'express';
// import * as fs from 'fs';
// import * as jwt from 'jsonwebtoken';
// import { v4 } from 'uuid';

// import config from '../../../../../contexts/shared/infrastructure/convict/config/config';
// import CreateSpotifyUserReq from '../../controllers/login-spotify-user/LogInSpotifyUserReq';
// import SpotifyUserPutController from '../../controllers/login-spotify-user/SpotifyUserPutController';
// import container from '../../dependency-injection';

// type DECODEDJWT = {
// 	email: string;
// 	display_name: string;
// 	access_token: string;
// 	iat: number;
// 	exp: number;
// };
// export const register = (router: Router): void => {
// 	const controller = container.get<SpotifyUserPutController>(
// 		'apps.backoffice.SpotifyUserPutController'
// 	);
// 	// eslint-disable-next-line @typescript-eslint/no-misused-promises
// 	router.get('/app', (req: Request, res: Response) => {
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
// 		const token = req.cookies.access_token as unknown as string;
// 		const publicKey = fs.readFileSync(config.get('system.publicKey') as unknown as string, 'utf8');
// 		try {
// 			const decoded = JSON.parse(
// 				jwt.verify(token, publicKey, { algorithms: ['RS256'] }).toString()
// 			) as DECODEDJWT;
// 			res.json({ mssg: 'secure /app path', cookies: req.cookies as unknown as string, decoded });
// 			controller.run(
// 				Object.assign({}, req, { id: v4() }, decoded) as unknown as CreateSpotifyUserReq,
// 				res
// 			);
// 		} catch {
// 			res.redirect('/login');
// 		}
// 	});
// };
