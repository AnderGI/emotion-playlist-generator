import Command from './Command';

export default interface CommandHandler<C extends Command> {
	subscribedTo(): Command;
	handle(command: C): Promise<void>;
}
