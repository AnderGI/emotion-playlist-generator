import { datatype, system } from 'faker';
import path from 'path';

import SubmitImageCommand from '../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import SubmitImageReq from '../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageReq';

export class CreateImageCommandMother {
	static random(): SubmitImageCommand {
		const dirPath = system.directoryPath();
		const filename = system.fileName();
		const submitImageRequest = {
			id: datatype.uuid(),
			path: dirPath,
			fieldname: 'image',
			originalname: system.fileName(),
			encoding: '7-bit',
			mimetype: system.mimeType(),
			destination: path.join(dirPath, filename),
			filename,
			size: datatype.number({ min: 0, precision: 0 })
		} as unknown as SubmitImageReq;

		return SubmitImageCommand.create(submitImageRequest);
	}
}
