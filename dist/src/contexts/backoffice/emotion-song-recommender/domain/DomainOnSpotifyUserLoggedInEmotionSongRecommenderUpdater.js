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
const config_1 = __importDefault(require("../../../../shared/infrastructure/winston/config"));
const EmotionSongRecommender_1 = __importDefault(require("./EmotionSongRecommender"));
class DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater {
    static run(repository, eventBus) {
        return (command) => __awaiter(this, void 0, void 0, function* () {
            config_1.default.info('DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater#run');
            const emotionSongRecommender = new EmotionSongRecommender_1.default(command.params.spotifyUserId, command.params.spotifyUserMail);
            config_1.default.info('DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater before calling save');
            yield repository.save(emotionSongRecommender);
        });
    }
}
exports.default = DomainOnSpotifyUserLoggedInEmotionSongRecommenderUpdater;
