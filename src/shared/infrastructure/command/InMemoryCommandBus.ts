import Command from '../../domain/command/Command';
import CommandBus from '../../domain/command/CommandBus';
import CommandHandlers from '../../domain/command/CommandHandlers';

export default class InMemoryCommandBus implements CommandBus {
	constructor(private readonly commandHandlers: CommandHandlers) {}
	async dispatch(command: Command): Promise<void> {
		const commandHandler = this.commandHandlers.getHandler(command);

		await commandHandler.handle(command);

		return;
	}
}
