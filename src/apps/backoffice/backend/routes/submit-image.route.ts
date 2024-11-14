import { NextFunction, Request, Response, Router } from 'express';
import { body, ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';

import { ImagePutController } from '../controllers/submit-image/ImagePutController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
	const controller = container.get<ImagePutController>('apps.backoffice.ImagePutController');
	router.put('/images/:id', body('path').isString(), validateReq, (req: Request, res: Response) => {
		controller.run(req, res);
	});
};

function validateReq(req: Request, res: Response, next: NextFunction) {
	const result = validationResult(req);
	if (result.isEmpty()) {
		next();

		return;
	}
	const errors = result.array().map((error: ValidationError) => ({ [error.param]: error }));
	res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errors);
}
