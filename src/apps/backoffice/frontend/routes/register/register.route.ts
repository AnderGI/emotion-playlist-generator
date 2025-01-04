import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

export const register = (router: Router): void => {
	router.get('/register', (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.status(httpStatus.OK).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Main Page</title>
    </head>
    <body>
      <header>
        <h1>Log in Page</h1>
      </header>
      <main>
        <section>
          <form action="/login" method="get">
            <button>Log in with spotify</button>
          </form>
        </section>
      </main>
    </body>
    </html>  
    `);
		// controller.run(req, res);
	});
};
