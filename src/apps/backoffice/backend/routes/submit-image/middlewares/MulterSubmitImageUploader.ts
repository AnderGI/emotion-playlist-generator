import { NextFunction, Request, RequestHandler, Response } from 'express';
import multer from 'multer';
import path from 'path';

export class MulterSubmitImageUploader {
	private readonly upload: multer.Multer;
	private readonly storage: multer.StorageEngine;
	constructor() {
		(this.storage = multer.diskStorage({
			destination(req, file, cb) {
				cb(null, path.join(__dirname, '..', '..', '..', '..', '..', '..', '..', 'image-uploads'));
			},
			filename(req, file, cb) {
				const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
				cb(null, `${uniqueSuffix}-${file.originalname}`);
			}
		})),
			(this.upload = multer({ storage: this.storage }));
	}

	public handleSingleImageUpload(): RequestHandler {
		return this.upload.single('image');
	}

	public mutateRequestBody(req: Request, res: Response, next: NextFunction): void {
		const { id } = req.params;
		req.body = {
			...req.file,
			id
		};
		next();

		return;
	}
}
