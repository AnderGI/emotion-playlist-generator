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
const DomainSpotifyUserLastTracksSaver_1 = __importDefault(require("./save/DomainSpotifyUserLastTracksSaver"));
const DomainSpotifyUserLastTracksSearcher_1 = __importDefault(require("./search/DomainSpotifyUserLastTracksSearcher"));
class SpotifyUserLastTracks {
    constructor(userId, topTracks, updatedAt) {
        this.userId = userId;
        this.topTracks = topTracks;
        this.updatedAt = updatedAt;
    }
    static fromPrimitives(primitives) {
        return new SpotifyUserLastTracks(primitives.userId, primitives.topTracks, primitives.updatedAt);
    }
    static save(repository) {
        return (spotifyUserPrimitives) => __awaiter(this, void 0, void 0, function* () {
            yield DomainSpotifyUserLastTracksSaver_1.default.save(repository, spotifyUserPrimitives);
        });
    }
    static search(repository) {
        return (id) => __awaiter(this, void 0, void 0, function* () {
            yield DomainSpotifyUserLastTracksSearcher_1.default.search(repository, id);
        });
    }
    tracksShouldBeUpdatedAfterThreeWeeks() {
        const threeWeekInMs = 3 * 7 * 24 * 60 * 60 * 1000;
        return Date.now() - this.updatedAt >= threeWeekInMs;
    }
    toPrimitives() {
        return {
            userId: this.userId,
            topTracks: this.topTracks,
            updatedAt: this.updatedAt
        };
    }
}
exports.default = SpotifyUserLastTracks;
