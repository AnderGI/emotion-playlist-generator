import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type SpotifyUserLoggedInDomainEventAttributes = {
	readonly spotifyEmail: string;
	readonly spotifyDisplayName: string;
	readonly country: string;
	readonly refreshToken: string;
	readonly accessToken: string;
};

export class SpotifyUserLoggedInDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string =
		'andergi.backoffice.spotify-user.event.spotify-user-logged-in.1';

	readonly spotifyEmail: string;
	readonly spotifyDisplayName: string;
	readonly country: string;
	readonly refreshToken: string;
	readonly accessToken: string;
	constructor({
		aggregateId,
		spotifyEmail,
		spotifyDisplayName,
		country,
		refreshToken,
		accessToken,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		spotifyEmail: string;
		spotifyDisplayName: string;
		country: string;
		refreshToken: string;
		accessToken: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
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

	static fromPrimitives(params: {
		aggregateId: string;
		attributes: SpotifyUserLoggedInDomainEventAttributes;
		eventId?: string;
		occurredOn?: Date;
	}): SpotifyUserLoggedInDomainEvent {
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

	toPrimitives(): SpotifyUserLoggedInDomainEventAttributes {
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
