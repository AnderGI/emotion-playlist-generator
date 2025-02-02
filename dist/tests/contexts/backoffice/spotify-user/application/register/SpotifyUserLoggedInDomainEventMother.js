"use strict";
/* eslint-disable camelcase */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyUserLoggedInDomainEventMother = void 0;
const SpotifyUserLoggedInDomainEvent_1 = require("../../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent");
class SpotifyUserLoggedInDomainEventMother {
    static fromSpotifyUser(spotifyUser) {
        const { uuid, spotify_id, spotify_email, spotify_display_name, spotify_product, spotify_uri, spotify_type, country, refresh_token, access_token } = spotifyUser.toPrimitives();
        return SpotifyUserLoggedInDomainEvent_1.SpotifyUserLoggedInDomainEvent.fromPrimitives({
            aggregateId: uuid,
            attributes: {
                spotify_id,
                spotify_email,
                spotify_display_name,
                spotify_product,
                spotify_uri,
                spotify_type,
                country,
                refresh_token,
                access_token
            }
        });
    }
}
exports.SpotifyUserLoggedInDomainEventMother = SpotifyUserLoggedInDomainEventMother;
