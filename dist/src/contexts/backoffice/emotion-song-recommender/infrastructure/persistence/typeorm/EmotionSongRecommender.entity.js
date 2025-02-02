"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmotionSongRecommenderEntity = void 0;
const typeorm_1 = require("typeorm");
const EmotionSongRecommender_1 = __importDefault(require("../../../domain/EmotionSongRecommender"));
exports.EmotionSongRecommenderEntity = new typeorm_1.EntitySchema({
    name: 'EmotionSongRecommender',
    tableName: 'emotion_song_recommender',
    target: EmotionSongRecommender_1.default,
    columns: {
        spotifyUserId: {
            type: String,
            primary: true
        },
        spotifyUserMail: {
            type: String,
            nullable: true
        }
    }
});
