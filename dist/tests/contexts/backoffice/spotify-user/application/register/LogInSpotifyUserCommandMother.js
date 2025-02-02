"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInSpotifyUserCommandMother = void 0;
const LogInSpotifyUserCommand_1 = __importDefault(require("../../../../../../src/apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand"));
class LogInSpotifyUserCommandMother {
    static fromUser(spotifyUser) {
        return new LogInSpotifyUserCommand_1.default(spotifyUser.toPrimitives());
    }
}
exports.LogInSpotifyUserCommandMother = LogInSpotifyUserCommandMother;
