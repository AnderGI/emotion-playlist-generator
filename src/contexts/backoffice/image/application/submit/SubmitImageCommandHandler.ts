import SubmitImageCommand from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import Command from '../../../../../shared/domain/command/Command';
import CommandHandler from '../../../../../shared/domain/command/CommandHandler';
import { ImageSaver } from './ImageSaver';

export default class SubmitImageCommandHandler implements CommandHandler<SubmitImageCommand> {
	constructor(private readonly imageSaver: ImageSaver) {}
	subscribedTo(): Command {
		return SubmitImageCommand;
	}

	async handle(command: SubmitImageCommand): Promise<void> {
		await this.imageSaver.run(command);
	}
}
