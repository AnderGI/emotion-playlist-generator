import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { ImageSaver } from '../../../../../contexts/backoffice/image/application/save/ImageSaver';
import { Controller } from '../Controller';

export class ImagePutController implements Controller {
	constructor(private readonly imageSaver: ImageSaver) {}
	async run(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const { path } = req.body as { path: string };
		await this.imageSaver.save(id, path);
		res.status(httpStatus.CREATED).send();
	}
}
