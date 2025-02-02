"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyUserEntity = void 0;
const typeorm_1 = require("typeorm");
const ValueObjectTransformer_1 = require("../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const SpotifyId_1 = __importDefault(require("../../../domain/SpotifyId"));
const SpotifyUser_1 = __importDefault(require("../../../domain/SpotifyUser"));
const SpotifyUserCountryCode_1 = __importDefault(require("../../../domain/SpotifyUserCountryCode"));
const SpotifyUserDisplayName_1 = __importDefault(require("../../../domain/SpotifyUserDisplayName"));
const SpotifyUserEmail_1 = __importDefault(require("../../../domain/SpotifyUserEmail"));
const SpotifyUserRefreshToken_1 = __importDefault(require("../../../domain/SpotifyUserRefreshToken"));
exports.SpotifyUserEntity = new typeorm_1.EntitySchema({
    name: 'SpotifyUser',
    tableName: 'spotify_users',
    target: SpotifyUser_1.default,
    columns: {
        spotifyId: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(SpotifyId_1.default)
        },
        spotifyMail: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(SpotifyUserEmail_1.default)
        },
        spotifyDisplayName: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(SpotifyUserDisplayName_1.default)
        },
        countryCode: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(SpotifyUserCountryCode_1.default)
        },
        refreshToken: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(SpotifyUserRefreshToken_1.default)
        }
    }
});
