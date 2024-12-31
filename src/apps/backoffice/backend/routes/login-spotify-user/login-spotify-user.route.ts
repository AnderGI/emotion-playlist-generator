import { NextFunction, Request, Response, Router } from 'express';
import { body, param } from 'express-validator';

import ExpressRequestSchemaValidator from '../../controllers/login-spotify-user/ExpressRequestSchemaValidator';
import SpotifyUserPutController from '../../controllers/login-spotify-user/SpotifyUserPutController';
import container from '../../dependency-injection';

const requestSchemaValidator = new ExpressRequestSchemaValidator([
	// Validar el parámetro de la ruta "id"
	param('id').isUUID(4).withMessage('The ID must be a valid UUID (v4).'),

	// Validar el cuerpo de la solicitud
	body('spotifyDisplayName')
		.isString()
		.withMessage('spotifyDisplayName must be a string.')
		.isLength({ min: 1 })
		.withMessage('spotifyDisplayName cannot be empty.'),

	body('spotifyUri')
		.isString()
		.withMessage('spotifyUri must be a string.')
		.matches(/^spotify:user:[a-zA-Z0-9_]+$/)
		.withMessage('spotifyUri must match the format "spotify:user:username".'),

	body('spotifyMail').isEmail().withMessage('spotifyMail must be a valid email address.'),

	body('accessToken')
		.isString()
		.withMessage('accessToken must be a string.')
		.isJWT()
		.withMessage('accessToken must be a valid JWT.'),

	body('refreshToken')
		.isString()
		.withMessage('refreshToken must be a string.')
		.isBase64()
		.withMessage('refreshToken must be a valid Base64 string.'),

	body('productType')
		.isIn(['premium', 'free'])
		.withMessage('productType must be either "premium" or "free".'),

	body('countryCode')
		.isISO31661Alpha2()
		.withMessage('countryCode must be a valid ISO 3166-1 alpha-2 country code.'),

	body('ipAddress').isIP().withMessage('ipAddress must be a valid IP address.')
]);
export const register = (router: Router): void => {
	const controller = container.get<SpotifyUserPutController>(
		'apps.backoffice.SpotifyUserPutController'
	);
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	router.put(
		'/spotifyUsers/:id',
		requestSchemaValidator.getValidationChain(),
		(req: Request, res: Response, next: NextFunction) =>
			requestSchemaValidator.validateRequestSchema(req, res, next),
		(req: Request, res: Response) => {
			controller.run(req, res);
		}
	);
};
