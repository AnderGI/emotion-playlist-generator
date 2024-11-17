import Command from './Command';
import CommandHandler from './CommandHandler';

export default class CommandHandlers extends Map<Command, CommandHandler<Command>> {
	constructor(private readonly commandHandlers: Array<CommandHandler<Command>>) {
		super();
		this.commandHandlers.forEach(handler => {
			this.set(handler.subscribedTo(), handler);
		});
	}

	public getHandler(command: Command): CommandHandler<Command> {
		const commandHandler = this.get(command.constructor);
		if (!commandHandler) {
			throw new Error(`No handler found for ${command.constructor.name}`);
		}

		return commandHandler;
	}
}
