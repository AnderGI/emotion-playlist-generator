import CreateImageCommand from '../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand';
import Command from '../../../../../shared/domain/command/Command';
import CommandHandler from '../../../../../shared/domain/command/CommandHandler';
import { ImageSaver } from './ImageSaver';

export default class CreateImageCommandHandler implements CommandHandler<CreateImageCommand> {
	constructor(private readonly imageSaver: ImageSaver) {}
	subscribedTo(): Command {
		return CreateImageCommand;
	}

	async handle(command: CreateImageCommand): Promise<void> {
		await this.imageSaver.run(command);
	}
}
