import { datatype, system } from 'faker';

import CreateImageReq from '../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageReq';

export class CreateImageReqMother {
	static random(): CreateImageReq {
		return {
			id: datatype.uuid(),
			path: system.filePath(),
			fieldname: 'image',
			originalname: system.commonFileName('jpg'),
			encoding: '7bit',
			mimetype: 'image/jpeg',
			destination: system.directoryPath(),
			filename: 'image-1731751422764-87172861',
			size: datatype.number({ min: 0 })
		};
	}
}
