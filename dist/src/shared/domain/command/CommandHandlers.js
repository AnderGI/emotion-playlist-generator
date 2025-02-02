"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandHandlers extends Map {
    constructor(commandHandlers) {
        super();
        this.commandHandlers = commandHandlers;
        this.commandHandlers.forEach(handler => {
            this.set(handler.subscribedTo(), handler);
        });
    }
    getHandler(command) {
        const commandHandler = this.get(command.constructor);
        if (!commandHandler) {
            throw new Error(`No handler found for ${command.constructor.name}`);
        }
        return commandHandler;
    }
}
exports.default = CommandHandlers;
