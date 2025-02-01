import { Request, Response, Router } from 'express';
import fs from 'fs';
import httpStatus from 'http-status';

import ImagePutController from '../../controllers/submit-image/ImagePutController';
import container from '../../dependency-injection';

export const register = (router: Router): void => {
	const controller = container.get<ImagePutController>('apps.backoffice.ImagePutController');
	router.put('/images/:id', (req: Request, res: Response) => {
		console.log('📥 Backend submit route');
		const { id } = req.params;
		const boundaryRegex = /boundary=(.+)/;
		const contentType = req.headers['content-type'] as string;
		const boundaryMatch = contentType.match(boundaryRegex);

		if (!boundaryMatch) {
			return res.status(httpStatus.BAD_REQUEST).send({ error: 'No boundary found' });
		}

		const boundary = `--${boundaryMatch[1]}`;
		let rawData = '';

		req.on('data', (chunk: Buffer) => {
			rawData += chunk.toString('binary'); // Asegurar que no se pierda información
		});

		req.on('end', () => {
			const parts = rawData.split(boundary).slice(1, -1); // Eliminar primeras y últimas líneas

			parts.forEach(part => {
				const [headers, fileContent] = part.split('\r\n\r\n');
				if (headers.includes('filename=')) {
					const filenameMatch = headers.match(/filename="(.+?)"/);
					if (!filenameMatch) {
						return;
					}
					const filename = filenameMatch[1].trim();
					const content = fileContent.slice(0, -2); // Quitar el `\r\n` extra del final

					// Guardar archivo
					fs.writeFileSync(`./images/${filename}`, content, 'binary');
					console.log(`✅ Archivo guardado: ${filename}`);
					const createImageReq = {
						id,
						dirname: 'images',
						filename
					};
					controller.run(createImageReq, res);
				}
			});
			res.status(httpStatus.OK).json({ message: 'Archivo recibido correctamente' });
		});

		req.on('error', err => {
			console.error('❌ Error al procesar la solicitud:', err);
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Error procesando archivo' });
		});
	});
};
