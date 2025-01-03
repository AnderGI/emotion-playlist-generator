"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateImageCommand_1 = __importDefault(require("../../../../../apps/backoffice/backend/controllers/submit-image/CreateImageCommand"));
class CreateImageCommandHandler {
    imageSaver;
    constructor(imageSaver) {
        this.imageSaver = imageSaver;
    }
    subscribedTo() {
        return CreateImageCommand_1.default;
    }
    async handle(command) {
        await this.imageSaver.run(command);
    }
}
exports.default = CreateImageCommandHandler;
