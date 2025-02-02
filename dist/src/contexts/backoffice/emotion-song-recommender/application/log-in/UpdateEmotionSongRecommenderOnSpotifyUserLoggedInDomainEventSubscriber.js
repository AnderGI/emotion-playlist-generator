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
const SpotifyUserLoggedInDomainEvent_1 = require("../../../spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent");
const UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand_1 = __importDefault(require("./UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand"));
class UpdateEmotionSongRecommenderOnSpotifyUserLoggedInDomainEventSubscriber {
    constructor(updater) {
        this.updater = updater;
    }
    subscribedTo() {
        return [SpotifyUserLoggedInDomainEvent_1.SpotifyUserLoggedInDomainEvent];
    }
    on(domainEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            config_1.default.info('UpdateEmotionSongRecommenderOnSpotifyUserLoggedInDomainEvent#on');
            yield this.updater.run(new UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand_1.default({
                spotifyUserId: domainEvent.aggregateId,
                spotifyUserMail: domainEvent.spotifyEmail
            }));
        });
    }
    queueName() {
        return 'andergi.backoffice.emotion-song-recommender.update_emotion_song_recommender_on_spotify_user_logged_in';
    }
}
exports.default = UpdateEmotionSongRecommenderOnSpotifyUserLoggedInDomainEventSubscriber;
