"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateImageCommand_1 = __importDefault(require("./CreateImageCommand"));
class ImagePutController {
    commandBus;
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async run(req, res) {
        const { id, path } = req;
        await this.commandBus.dispatch(new CreateImageCommand_1.default(id, path));
        res.status(201).send();
    }
}
exports.default = ImagePutController;
