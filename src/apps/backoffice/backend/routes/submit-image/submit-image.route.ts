import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

import SubmitImageReq from '../../controllers/submit-image/CreateImageReq';
import ImagePutController from '../../controllers/submit-image/ImagePutController';
import container from '../../dependency-injection';

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

type UploadedFile = {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	destination: string;
	filename: string;
	path: string;
	size: string;
};

export const register = (router: Router): void => {
	const controller = container.get<ImagePutController>('apps.backoffice.ImagePutController');
	router.put('/images/:id', (req: Request, res: Response) => {
		console.log('backend submit route');
		const data = req.body as UploadedFile;
		const { id } = req.params;
		const submitImageRequest = Object.assign(
			data,
			{ id },
			Number(data.size)
		) as unknown as SubmitImageReq;
		controller.run(submitImageRequest, res);
		res.status(httpStatus.OK).send();
	});
};
