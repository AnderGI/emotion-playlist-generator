import { Request, Response } from 'express';

export interface Controller<R extends Request> {
	run(req: R, res: Response): Promise<void> | void;
}
