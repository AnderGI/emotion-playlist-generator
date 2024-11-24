import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export default function validateContentType(req: Request, res: Response, next: NextFunction): void {
	const contentType = req.headers['content-type'];
	if (contentType?.includes('multipart/form-data')) {
		next();

		return;
	}

	res.status(httpStatus.UNSUPPORTED_MEDIA_TYPE).send();
}
