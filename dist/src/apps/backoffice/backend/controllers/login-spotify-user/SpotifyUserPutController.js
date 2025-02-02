"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../../../shared/infrastructure/winston/config"));
const LogInSpotifyUserCommand_1 = __importDefault(require("./LogInSpotifyUserCommand"));
class SpotifyUserPutController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    run(req) {
        config_1.default.http('--- SpotifyUserPutController Request');
        config_1.default.info('--- Data');
        config_1.default.info(JSON.stringify(req, null, 2));
        const command = new LogInSpotifyUserCommand_1.default(req);
        config_1.default.info('--- Created LogInSpotifyUserCommand');
        config_1.default.info(JSON.stringify(command, null, 2));
        this.commandBus.dispatch(command);
    }
}
exports.default = SpotifyUserPutController;
