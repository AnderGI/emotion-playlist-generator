/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type SpotifyUserLoggedInDomainEventAttributes = {
	readonly spotifyEmail: string;
	readonly spotifyDisplayName: string;
	readonly country: string;
	readonly refreshToken: string;
};

export class SpotifyUserLoggedInDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string =
		'andergi.backoffice.spotify-user.event.spotify-user-logged-in.1';

	readonly spotifyEmail: string;
	readonly spotifyDisplayName: string;
	readonly country: string;
	readonly refreshToken: string;
	constructor({
		aggregateId,
		spotifyEmail,
		spotifyDisplayName,
		country,
		refreshToken,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		spotifyEmail: string;
		spotifyDisplayName: string;
		country: string;
		refreshToken: string;
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
			eventId,
			occurredOn
		});
	}

	toPrimitives(): SpotifyUserLoggedInDomainEventAttributes {
		const { spotifyEmail, spotifyDisplayName, country, refreshToken } = this;

		return {
			spotifyEmail,
			spotifyDisplayName,
			country,
			refreshToken
		};
	}

	fromReceivedData(data: {
		eventName: string;
		aggregateId: string;
		eventId: string;
		occurredOn: string;
		attributes: any;
	}): DomainEvent {
		return SpotifyUserLoggedInDomainEvent.fromPrimitives({
			aggregateId: data.aggregateId,
			attributes: data.attributes,
			eventId: data.eventId,
			occurredOn: new Date(this.occurredOn)
		});
	}

	getEventName(): string {
		return SpotifyUserLoggedInDomainEvent.EVENT_NAME;
	}
}
