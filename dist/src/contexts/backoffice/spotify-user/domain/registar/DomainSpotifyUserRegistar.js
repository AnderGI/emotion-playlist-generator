"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../../../shared/infrastructure/winston/config"));
const SpotifyUserLoggedInDomainEvent_1 = require("../../application/log-in/SpotifyUserLoggedInDomainEvent");
const SpotifyUser_1 = __importDefault(require("../SpotifyUser"));
class DomainSpotifyUserRegistar {
    static registar(spotifyUserRepository, eventBus) {
        return (command) => __awaiter(this, void 0, void 0, function* () {
            config_1.default.info('--- DomainSpotifyUserRegistar');
            config_1.default.info('--- command');
            config_1.default.info(JSON.stringify(command, null, 2));
            const spotifyUser = SpotifyUser_1.default.create(command);
            config_1.default.info('--- Created Spotify user');
            config_1.default.info(JSON.stringify(spotifyUser.toPrimitives(), null, 2));
            config_1.default.info('--- Before calling spotifyUserRepository');
            yield spotifyUserRepository.save(spotifyUser);
            config_1.default.info('--- After calling spotifyUserRepository');
            const { spotifyId, spotifyEmail, spotifyDisplayName, country, refreshToken, accessToken } = spotifyUser.toPrimitives();
            config_1.default.info('--- Before publishing SpotifyUserLoggedInDomainEvent');
            yield eventBus.publish(SpotifyUserLoggedInDomainEvent_1.SpotifyUserLoggedInDomainEvent.fromPrimitives({
                aggregateId: spotifyId,
                attributes: {
                    spotifyEmail,
                    spotifyDisplayName,
                    country,
                    refreshToken,
                    accessToken
                }
            }));
            config_1.default.info('--- After publishing SpotifyUserLoggedInDomainEvent');
        });
    }
}
exports.default = DomainSpotifyUserRegistar;
