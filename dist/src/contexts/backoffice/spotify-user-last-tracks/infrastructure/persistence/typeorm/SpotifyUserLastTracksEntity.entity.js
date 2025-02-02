"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyUserLastTracksEntity = void 0;
const typeorm_1 = require("typeorm");
const SpotifyUserLastTracks_1 = __importDefault(require("../../../domain/SpotifyUserLastTracks"));
exports.SpotifyUserLastTracksEntity = new typeorm_1.EntitySchema({
    name: 'SpotifyUserLastTracks',
    tableName: 'spotify_users_last_tracks',
    target: SpotifyUserLastTracks_1.default,
    columns: {
        userId: {
            type: String,
            primary: true
        },
        topTracks: {
            type: 'json'
        },
        updatedAt: {
            type: 'bigint'
        }
    }
});
