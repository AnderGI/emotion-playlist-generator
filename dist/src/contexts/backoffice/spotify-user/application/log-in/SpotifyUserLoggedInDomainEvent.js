"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyUserLoggedInDomainEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/event/DomainEvent");
class SpotifyUserLoggedInDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, spotifyEmail, spotifyDisplayName, country, refreshToken, accessToken, eventId, occurredOn }) {
        super({
            eventName: SpotifyUserLoggedInDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn
        });
        this.spotifyEmail = spotifyEmail;
        this.spotifyDisplayName = spotifyDisplayName;
        this.country = country;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new SpotifyUserLoggedInDomainEvent({
            aggregateId,
            spotifyEmail: attributes.spotifyEmail,
            spotifyDisplayName: attributes.spotifyDisplayName,
            country: attributes.country,
            refreshToken: attributes.refreshToken,
            accessToken: attributes.accessToken,
            eventId,
            occurredOn
        });
    }
    toPrimitives() {
        const { spotifyEmail, spotifyDisplayName, country, refreshToken, accessToken } = this;
        return {
            spotifyEmail,
            spotifyDisplayName,
            country,
            refreshToken,
            accessToken
        };
    }
}
exports.SpotifyUserLoggedInDomainEvent = SpotifyUserLoggedInDomainEvent;
SpotifyUserLoggedInDomainEvent.EVENT_NAME = 'andergi.backoffice.spotify-user.event.spotify-user-logged-in.1';
