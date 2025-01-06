import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

// const expressRequestSchemaValidator = new SubmitImageExpressRequestSchemaValidator([
// 	body('fieldname').exists().isString(), // 'image',
// 	body('originalname').exists().isString(), // name.ext
// 	body('encoding').exists().isString(), // 7bit
// 	body('mimetype').exists().isString(), // image/exte
// 	body('destination').exists().isString(), // anbsolute path of root dir
// 	body('filename').exists().isString(), // name
// 	body('path').exists().isString(), // absolute path of file
// 	body('size').exists().isNumeric(), // number
// 	body('id').exists().isUUID('all') // uuid
// ]);

// const multerSubmitImageUploader = new MulterSubmitImageUploader();

export const register = (router: Router): void => {
	//	const controller = container.get<ImagePutController>('apps.backoffice.ImagePutController');
	router.put(
		'/images/:id',
		// validateContentType,
		// multerSubmitImageUploader.handleSingleImageUpload(),
		// (req: Request, res: Response, next: NextFunction) =>
		// 	multerSubmitImageUploader.mutateRequestBody(req, res, next),
		// expressRequestSchemaValidator.getValidationChain(),
		// (req: Request, res: Response, next: NextFunction) =>
		// 	expressRequestSchemaValidator.validateRequestSchema(req, res, next),
		(req: Request, res: Response) => {
			console.log('llega');
			res.status(httpStatus.OK).send();
			//controller.run(req.body as CreateImageReq, res);
		}
	);
};
