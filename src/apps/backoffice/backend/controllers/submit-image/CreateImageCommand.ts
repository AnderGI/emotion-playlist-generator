import Command from '../../../../../shared/domain/bus/command/Command';

export default class CreateImageCommand implements Command {
	constructor(readonly id: string, readonly path: string) {}
}
