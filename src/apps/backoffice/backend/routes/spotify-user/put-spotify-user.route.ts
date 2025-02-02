import { NextFunction, Request, Response, Router } from 'express';
import { body, param, validationResult } from 'express-validator';

import SpotifyUserData from '../../controllers/login-spotify-user/SpotifyUserData';
import SpotifyUserPutController from '../../controllers/login-spotify-user/SpotifyUserPutController';
import container from '../../dependency-injection';

// request user authorization
export const register = (router: Router): void => {
	const controller = container.get<SpotifyUserPutController>(
		'apps.backoffice.SpotifyUserPutController'
	);
	router.put(
		'/spotify-users/:id',
		[
			param('id').isUUID().withMessage('The id parameter must be a valid UUID'),
			body('spotifyId').isString().withMessage('spotify_id must be a string'),
			body('spotifyEmail').isEmail().withMessage('spotify_email must be a valid email address'),
			body('spotifyDisplayName')
				.isString()
				.isLength({ min: 1 })
				.withMessage('spotifyDisplayName must be a non-empty string'),
			body('country')
				.isString()
				.isLength({ min: 2, max: 2 })
				.withMessage('country must be a valid 2-letter country code'),
			body('refreshToken').isString().withMessage('refresh_token must be a string'),
			body('accessToken').isString().withMessage('access_token must be a string')
		],
		(req: Request, res: Response, next: NextFunction) => {
			// Verificar si hay errores de validación
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Si hay errores, devolver 400 con los detalles
				return res.status(400).send();
			}

			next();
		},
		(req: Request, res: Response) => {
			const { id } = req.params;
			const data = Object.assign({}, { uuid: id }, req.body) as SpotifyUserData;
			controller.run(data);
			res.status(201).send();
		}
	);
};
