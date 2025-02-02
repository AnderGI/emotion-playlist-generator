"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyUserMother = void 0;
const crypto_1 = require("crypto");
const faker_1 = __importDefault(require("faker"));
const SpotifyUser_1 = __importDefault(require("../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser"));
class SpotifyUserMother {
    static create(value) {
        const name = faker_1.default.name.firstName();
        return SpotifyUser_1.default.fromPrimitives(Object.assign({}, value, {
            uuid: faker_1.default.datatype.uuid(),
            spotify_id: name,
            spotify_email: faker_1.default.internet.email(),
            spotify_display_name: name,
            spotify_product: faker_1.default.random.arrayElement(['premium', 'free']),
            spotify_uri: `spotify:user:${name}`,
            spotify_type: faker_1.default.random.arrayElement(['user']),
            country: faker_1.default.address.countryCode('ISO 3166-1 alpha-2'),
            refresh_token: (0, crypto_1.randomBytes)(64).toString('hex'),
            access_token: (0, crypto_1.randomBytes)(64).toString('hex')
        }));
    }
}
exports.SpotifyUserMother = SpotifyUserMother;
