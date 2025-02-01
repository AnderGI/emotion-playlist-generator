import { datatype, system } from 'faker';

import SubmitImageCommand from '../../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import SubmitImageReq from '../../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageReq';

export class CreateImageCommandMother {
	static random(): SubmitImageCommand {
		const submitImageRequest = {
			id: datatype.uuid(),
			fieldname: system.fileName(),
			dirname: system.directoryPath()
		} as unknown as SubmitImageReq;

		return SubmitImageCommand.create(submitImageRequest);
	}
}
