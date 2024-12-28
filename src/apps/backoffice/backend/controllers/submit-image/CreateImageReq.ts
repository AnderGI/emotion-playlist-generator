import { Request } from 'express';

import { ControllerRequest } from '../../../../../shared/domain/ControllerRequest';

export default interface CreateImageReq extends ControllerRequest, Request {
	id: string; // uuid
	path: string; // file path
	fieldname: string; // 'image'
	originalname: string; // 'artist-white.jpg'
	encoding: string; // '7bit'
	mimetype: string; // 'image/jpeg'
	destination: string; // directory path
	filename: string; // 'image-1731751422764-87172861'
	size: number; // 4495911
}
