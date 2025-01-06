import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';
import multer from 'multer';

import { authJwt } from '../../middlewares/auth-jwt/auth-jwt.middleware';

const upload = multer({ dest: 'uploads/' });

type MulterReqFile = {
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
	router.post('/upload', authJwt, upload.single('image'), (req: Request, res: Response) => {
		const multer = req.file as unknown as MulterReqFile;
		console.log(multer);
		res.status(httpStatus.ACCEPTED).send();
	});
};
