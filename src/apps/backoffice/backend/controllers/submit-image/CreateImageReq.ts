import { Request } from 'express';

import { ControllerRequest } from '../../../../../shared/domain/ControllerRequest';

export default interface SubmitImageReq extends ControllerRequest, Request {
	id: string;
	path: string;
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	destination: string;
	filename: string;
	size: number;
}
