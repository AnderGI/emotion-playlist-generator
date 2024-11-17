import { Response } from 'express';

import { ImageSaver } from '../../../../../contexts/backoffice/image/application/save/ImageSaver';
import { Controller } from '../Controller';
import CreateImageReq from './CreateImageReq';

export default class ImagePutController implements Controller {
	constructor(private readonly imageSaver: ImageSaver) {}
	async run(req: CreateImageReq, res: Response): Promise<void> {
		await this.imageSaver.save(req);
		res.status(201).send();
	}
}
