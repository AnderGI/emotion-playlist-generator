import { Request, Response, Router } from 'express';

import { ImagePutController } from '../controllers/submit-image/ImagePutController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
	const controller = container.get<ImagePutController>('apps.backoffice.ImagePutController');
	router.put('/images/:id', (req: Request, res: Response) => {
		controller.run(req, res);
	});
};
