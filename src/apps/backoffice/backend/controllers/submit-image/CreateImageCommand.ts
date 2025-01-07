import Command from '../../../../../shared/domain/command/Command';
import SubmitImageReq from './CreateImageReq';

export default class SubmitImageCommand implements Command {
	private constructor(readonly params: SubmitImageReq) {}

	public static create(req: SubmitImageReq): SubmitImageCommand {
		return new SubmitImageCommand(req);
	}
}
