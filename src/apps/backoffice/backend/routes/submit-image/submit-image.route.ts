import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator';

import CreateImageReq from '../../controllers/submit-image/CreateImageReq';
import ImagePutController from '../../controllers/submit-image/ImagePutController';
import container from '../../dependency-injection';
import validateContentType from './middlewares/ContentTypeValidator.middleware';
import { MulterSubmitImageUploader } from './middlewares/MulterSubmitImageUploader';
import SubmitImageExpressRequestSchemaValidator from './middlewares/SubmitImageExpressRequestSchemaValidator';

const expressRequestSchemaValidator = new SubmitImageExpressRequestSchemaValidator([
	body('fieldname').exists().isString(), // 'image',
	body('originalname').exists().isString(), // name.ext
	body('encoding').exists().isString(), // 7bit
	body('mimetype').exists().isString(), // image/exte
	body('destination').exists().isString(), // anbsolute path of root dir
	body('filename').exists().isString(), // name
	body('path').exists().isString(), // absolute path of file
	body('size').exists().isNumeric(), // number
	body('id').exists().isUUID('all') // uuid
]);

const multerSubmitImageUploader = new MulterSubmitImageUploader();

export const register = (router: Router): void => {
	const controller = container.get<ImagePutController>('apps.backoffice.ImagePutController');
	router.put(
		'/images/:id',
		validateContentType,
		multerSubmitImageUploader.handleSingleImageUpload(),
		(req: Request, res: Response, next: NextFunction) =>
			multerSubmitImageUploader.mutateRequestBody(req, res, next),
		expressRequestSchemaValidator.getValidationChain(),
		(req: Request, res: Response, next: NextFunction) =>
			expressRequestSchemaValidator.validateRequestSchema(req, res, next),
		(req: Request, res: Response) => {
			controller.run(req.body as CreateImageReq, res);
		}
	);
};
