import Command from '../../../domain/bus/command/Command';
import CommandBus from '../../../domain/bus/command/CommandBus';
import CommandHandlers from '../../../domain/bus/command/CommandHandlers';

export default class InMemoryCommandBus implements CommandBus {
	constructor(private readonly commandHandlers: CommandHandlers) {}
	async dispatch(command: Command): Promise<void> {
		const commandHandler = this.commandHandlers.getHandler(command);

		await commandHandler.handle(command);

		return;
	}
}
