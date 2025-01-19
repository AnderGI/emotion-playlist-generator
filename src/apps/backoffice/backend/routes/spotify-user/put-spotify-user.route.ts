import { Request, Response, Router } from 'express';

import SpotifyUserData from '../../controllers/login-spotify-user/SpotifyUserData';
import SpotifyUserPutController from '../../controllers/login-spotify-user/SpotifyUserPutController';
import container from '../../dependency-injection';

// request user authorization
export const register = (router: Router): void => {
	const controller = container.get<SpotifyUserPutController>(
		'apps.backoffice.SpotifyUserPutController'
	);
	router.put('/spotify-users/:id', (req: Request, res: Response) => {
		const { id } = req.params;
		const data = Object.assign({}, { uuid: id }, req.body) as SpotifyUserData;
		controller.run(data);
		res.status(201).send();
	});
};
