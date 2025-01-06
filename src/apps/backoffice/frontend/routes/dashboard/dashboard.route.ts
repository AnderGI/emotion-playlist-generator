import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

import { authJwt } from '../../middlewares/auth-jwt/auth-jwt.middleware';

export const register = (router: Router): void => {
	router.get('/dashboard', authJwt, (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.status(httpStatus.OK).send(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Upload Page</title>
		</head>
		<body>
			<header>
				<h1>Upload Image Page</h1>
			</header>
			<main>
				<section>
					<form action="/upload" method="post" enctype="multipart/form-data">
						<label for="image-upload">Upload a PNG image:</label>
						<input type="file" id="image-upload" name="image" accept="image/png" required>
						<button type="submit">Upload</button>
					</form>
				</section>
			</main>
		</body>
		</html>	
    `);
	});
};
