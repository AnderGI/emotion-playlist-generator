"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const LogInSpotifyUserCommand_1 = __importDefault(require("./LogInSpotifyUserCommand"));
class SpotifyUserPutController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    run(req, res) {
        const command = new LogInSpotifyUserCommand_1.default({
            id: req.id,
            spotifyDisplayName: req.spotifyDisplayName,
            spotifyUri: req.spotifyUri,
            spotifyMail: req.spotifyMail,
            accessToken: req.accessToken,
            refreshToken: req.refreshToken,
            productType: req.productType,
            countryCode: req.countryCode,
            ipAddress: req.ipAddress
        });
        this.commandBus.dispatch(command);
        res.status(http_status_1.default.CREATED).send();
    }
}
exports.default = SpotifyUserPutController;
