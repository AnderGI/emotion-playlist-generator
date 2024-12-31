import { Response } from 'express';

export interface Controller<R> {
	run(req: R, res: Response): Promise<void> | void;
}
