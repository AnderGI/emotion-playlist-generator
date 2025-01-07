import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';
import multer from 'multer';

import { UuidValueObject } from '../../../../../contexts/shared/domain/value-object/UuidValueObject';
import { authJwt } from '../../middlewares/auth-jwt/auth-jwt.middleware';

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './uploads');
	},
	filename(req, file, cb) {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${file.fieldname}-${uniqueSuffix}`);
	}
});

const upload = multer({ storage });

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
		/*
		fieldname: 'image',
		originalname: 'annderr_Un_logo_griego_minimalista_estatua_de_un_culturista_e_ae99e2e5-387b-43c5-8ccd-6b10340062d6_2.png',
		encoding: '7bit',
   mimetype: 'image/png',
   destination: './uploads',
   filename: 'image-1736178002962-82781164',
   path: 'uploads\\image-1736178002962-82781164',
   size: 1069465
*/
		fetch(`http://localhost:3000/images/${UuidValueObject.random()}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(multer)
		});
		res.status(httpStatus.ACCEPTED).send();
	});
};
