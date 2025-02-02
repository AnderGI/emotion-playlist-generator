"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpotifyId_1 = __importDefault(require("./SpotifyId"));
const SpotifyUserAccessToken_1 = __importDefault(require("./SpotifyUserAccessToken"));
const SpotifyUserCountryCode_1 = __importDefault(require("./SpotifyUserCountryCode"));
const SpotifyUserDisplayName_1 = __importDefault(require("./SpotifyUserDisplayName"));
const SpotifyUserEmail_1 = __importDefault(require("./SpotifyUserEmail"));
const SpotifyUserRefreshToken_1 = __importDefault(require("./SpotifyUserRefreshToken"));
class SpotifyUser {
    constructor(spotifyId, spotifyMail, spotifyDisplayName, countryCode, refreshToken, accessToken) {
        this.spotifyId = spotifyId;
        this.spotifyMail = spotifyMail;
        this.spotifyDisplayName = spotifyDisplayName;
        this.countryCode = countryCode;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
    }
    static create(command) {
        const { spotifyId, spotifyEmail, spotifyDisplayName, country, refreshToken, accessToken } = command.params;
        return new SpotifyUser(new SpotifyId_1.default(spotifyId), new SpotifyUserEmail_1.default(spotifyEmail), new SpotifyUserDisplayName_1.default(spotifyDisplayName), new SpotifyUserCountryCode_1.default(country), new SpotifyUserRefreshToken_1.default(refreshToken), new SpotifyUserAccessToken_1.default(accessToken));
    }
    static fromPrimitives({ spotifyId, spotifyEmail, spotifyDisplayName, country, refreshToken, accessToken }) {
        return new SpotifyUser(new SpotifyId_1.default(spotifyId), new SpotifyUserEmail_1.default(spotifyEmail), new SpotifyUserDisplayName_1.default(spotifyDisplayName), new SpotifyUserCountryCode_1.default(country), new SpotifyUserRefreshToken_1.default(refreshToken), new SpotifyUserAccessToken_1.default(accessToken));
    }
    toPrimitives() {
        return {
            spotifyId: this.spotifyId.value,
            spotifyEmail: this.spotifyMail.value,
            spotifyDisplayName: this.spotifyDisplayName.value,
            country: this.countryCode.value,
            refreshToken: this.refreshToken.value,
            accessToken: this.accessToken.value
        };
    }
}
exports.default = SpotifyUser;
