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
const SpotifyUserLastTracksGetter_1 = __importDefault(require("../../domain/get-spotify-user-last-tracks/SpotifyUserLastTracksGetter"));
const DomainSpotifyUserLastTracksSearcher_1 = __importDefault(require("../../domain/search/DomainSpotifyUserLastTracksSearcher"));
const SpotifyUserLastTracks_1 = __importDefault(require("../../domain/SpotifyUserLastTracks"));
class SpotifyUserLastTracksSaver {
    constructor(spotifyUserLastTracksRetriever, spotifyUserLastTracksRepository) {
        this.spotifyUserLastTracksRetriever = spotifyUserLastTracksRetriever;
        this.spotifyUserLastTracksRepository = spotifyUserLastTracksRepository;
    }
    run(command) {
        return __awaiter(this, void 0, void 0, function* () {
            config_1.default.info('--- SpotifyUserLastTracksSaver#run');
            config_1.default.info('--- command');
            config_1.default.info(JSON.stringify(command, null, 2));
            config_1.default.info('--- Before searching in ddbb');
            // Get Spotify User Last Tracks
            const exitingUser = yield DomainSpotifyUserLastTracksSearcher_1.default.search(this.spotifyUserLastTracksRepository, command.data.aggregateId);
            config_1.default.info('--- existing user');
            config_1.default.info(exitingUser);
            if (!(exitingUser === null || exitingUser === void 0 ? void 0 : exitingUser.tracksShouldBeUpdatedAfterThreeWeeks())) {
                config_1.default.info('no necessary update');
                return Promise.resolve();
            }
            // See if update is necessary
            // If it is do de update
            config_1.default.info('--- Before retrieving spotify users last tracks');
            const data = yield SpotifyUserLastTracksGetter_1.default.getSpotifyUserLastTracks(this.spotifyUserLastTracksRetriever)(command);
            config_1.default.info('--- AAfter retrieving spotify user last tracks');
            // Deserialize
            const tracks = data.items.map(item => {
                return JSON.stringify({
                    album_id: item.album.id,
                    album_name: item.album.name,
                    album_release_date: item.album.release_date,
                    artist_name: item.artists[0].name,
                    playable: item.is_playable,
                    track_name: item.name,
                    track_popularity: item.popularity,
                    track_url: item.external_urls.spotify
                });
            });
            config_1.default.info('--- SPotifyUserLastTracks top tracks');
            config_1.default.info(JSON.stringify(tracks, null, 2));
            // save DOMAIN
            config_1.default.info('--- Before calling SpotifyUserLastTracks');
            yield SpotifyUserLastTracks_1.default.save(this.spotifyUserLastTracksRepository)({
                userId: command.data.aggregateId,
                topTracks: tracks,
                updatedAt: new Date().getTime()
            });
            config_1.default.info('--- After calling SpotifyUserLastTracks');
        });
    }
}
exports.default = SpotifyUserLastTracksSaver;
