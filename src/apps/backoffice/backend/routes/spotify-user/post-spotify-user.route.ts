import { NextFunction, Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

import SpotifyUserReq from '../../controllers/login-spotify-user/SpotifyUserReq';
import SpotifyUserPostController from '../../controllers/login-spotify-user/SpotifyUserPostController';
import container from '../../dependency-injection';

// request user authorization
export const register = (router: Router): void => {
	const controller = container.get<SpotifyUserPostController>(
		'apps.backoffice.SpotifyUserPostController'
	);
	router.post(
		'/spotify-users',
		[
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
			body('refreshToken').isString().withMessage('refresh_token must be a string')
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
			const data = Object.assign({}, req.body) as SpotifyUserReq;
			controller.run(data);
			res.status(201).send();
		}
	);
};
