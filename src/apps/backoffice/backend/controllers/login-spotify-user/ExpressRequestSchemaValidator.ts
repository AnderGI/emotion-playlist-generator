import { NextFunction, Request, Response } from 'express';
import { ValidationChain, ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export default class ExpressRequestSchemaValidator {
	constructor(private readonly validationChain: ValidationChain[]) {}

	public getValidationChain(): ValidationChain[] {
		return this.validationChain;
	}

	public validateRequestSchema(req: Request, res: Response, next: NextFunction): void {
		const result = validationResult(req);
		if (result.isEmpty()) {
			next();

			return;
		}

		const errors = result.array().map((error: ValidationError) => ({ [error.param]: error }));
		res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errors);
	}
}
