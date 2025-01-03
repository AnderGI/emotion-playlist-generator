"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryCommandBus {
    commandHandlers;
    constructor(commandHandlers) {
        this.commandHandlers = commandHandlers;
    }
    async dispatch(command) {
        const commandHandler = this.commandHandlers.getHandler(command);
        await commandHandler.handle(command);
        return;
    }
}
exports.default = InMemoryCommandBus;
