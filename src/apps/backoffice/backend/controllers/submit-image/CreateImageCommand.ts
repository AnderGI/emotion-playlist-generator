import Command from '../../../../../shared/domain/command/Command';

export default class CreateImageCommand implements Command {
	constructor(readonly id: string, readonly path: string) {}
}
