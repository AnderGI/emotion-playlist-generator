import { datatype, system } from 'faker';

import CreateImageCommand from '../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand';

export class CreateImageCommandMother {
	static random(): CreateImageCommand {
		return {
			id: datatype.uuid(),
			filename: system.fileName()
		};
	}
}
