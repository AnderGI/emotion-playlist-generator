import Command from './Command';

export default interface CommandBus {
	dispatch(command: Command): Promise<void> | void;
}
