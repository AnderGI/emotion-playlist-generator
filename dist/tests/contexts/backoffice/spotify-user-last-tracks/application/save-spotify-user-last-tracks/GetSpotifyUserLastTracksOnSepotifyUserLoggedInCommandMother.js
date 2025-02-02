"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother = void 0;
const GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand_1 = __importDefault(require("../../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand"));
class GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother {
    static fromEvent(event) {
        return new GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand_1.default({
            spotify_id: event.spotify_id,
            spotify_email: event.spotify_email,
            spotify_display_name: event.spotify_display_name,
            spotify_product: event.spotify_product,
            spotify_uri: event.spotify_uri,
            spotify_type: event.spotify_type,
            country: event.country,
            access_token: event.access_token,
            aggregateId: event.aggregateId
        });
    }
}
exports.GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother = GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother;
