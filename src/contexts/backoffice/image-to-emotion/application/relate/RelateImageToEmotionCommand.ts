import Command from '../../../../../shared/domain/command/Command';

export default class RelateImageToEmotionCommand implements Command {
	constructor(readonly filename: string) {}
}
