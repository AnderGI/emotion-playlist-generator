import { NextFunction, Request, Response, Router } from 'express';
import { body, ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';
import multer from 'multer';
import path from 'path';

import CreateImageReq from '../controllers/submit-image/CreateImageReq';
import ImagePutController from '../controllers/submit-image/ImagePutController';
import container from '../dependency-injection';

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, path.join(__dirname, '..', '..', '..', '..', '..', 'image-uploads'));
	},
	filename(req, file, cb) {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	}
});

const upload = multer({ storage });

const reqSchema = [
	body('fieldname').exists().isString(), // 'image',
	body('originalname').exists().isString(), // name.ext
	body('encoding').exists().isString(), // 7bit
	body('mimetype').exists().isString(), // image/exte
	body('destination').exists().isString(), // anbsolute path of root dir
	body('filename').exists().isString(), // name
	body('path').exists().isString(), // absolute path of file
	body('size').exists().isNumeric(), // number
	body('id').exists().isUUID('all') // uuid
];

export const register = (router: Router): void => {
	const controller = container.get<ImagePutController>('apps.backoffice.ImagePutController');

	router.put(
		'/images/:id',
		validateContentType,
		upload.single('image'),
		mutateReqBody,
		reqSchema,
		validateReqSchema,
		(req: Request, res: Response) => {
			controller.run(req.body as CreateImageReq, res);
		}
	);
};

function mutateReqBody(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	req.body = {
		...req.file,
		id
	};
	next();

	return;
}

// validate paths uuid and multers types
function validateReqSchema(req: Request, res: Response, next: NextFunction) {
	const result = validationResult(req);
	if (result.isEmpty()) {
		next();

		return;
	}

	const errors = result.array().map((error: ValidationError) => ({ [error.param]: error }));
	res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errors);
}

function validateContentType(req: Request, res: Response, next: NextFunction) {
	const contentType = req.headers['content-type'];
	if (contentType?.includes('multipart/form-data')) {
		next();

		return;
	}

	res.status(httpStatus.UNSUPPORTED_MEDIA_TYPE).send();
}
