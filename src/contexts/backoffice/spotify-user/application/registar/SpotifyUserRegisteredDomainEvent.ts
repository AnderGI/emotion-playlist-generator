import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type SpotifyUserRegisteredDomainEventConstructorPrimitives = {
	aggregateId: string;
	occurredOn: Date | undefined;
	eventId: string | undefined;
	spotifyUserCountry: string;
	spotifyUserDisplayName: string;
	spotifyUserEmail: string;
	spotifyUserAccessToken: string;
};

type SpotifyUserRegisteredDomainEventAttributes = {
	spotifyUserCountry: string;
	spotifyUserDisplayName: string;
	spotifyUserEmail: string;
	spotifyUserAccessToken: string;
};

export default class SpotifyUserRegisteredDomainEvent extends DomainEvent {
	static EVENT_NAME = 'andergi.backoffice.spotify-user.event.spotify_user_registered.1';
	private readonly spotifyUserCountry: string;
	private readonly spotifyUserDisplayName: string;
	private readonly spotifyUserEmail: string;
	private readonly spotifyUserAccessToken: string;
	constructor({
		aggregateId,
		occurredOn,
		eventId,
		spotifyUserCountry,
		spotifyUserDisplayName,
		spotifyUserEmail,
		spotifyUserAccessToken
	}: SpotifyUserRegisteredDomainEventConstructorPrimitives) {
		super({
			eventName: SpotifyUserRegisteredDomainEvent.EVENT_NAME,
			aggregateId,
			occurredOn,
			eventId
		});
		this.spotifyUserCountry = spotifyUserCountry;
		this.spotifyUserDisplayName = spotifyUserDisplayName;
		this.spotifyUserEmail = spotifyUserEmail;
		this.spotifyUserAccessToken = spotifyUserAccessToken;
	}

	static fromPrimitives(params: {
		aggregateId: string;
		eventId?: string;
		occurredOn?: Date;
		attributes: SpotifyUserRegisteredDomainEventAttributes;
	}): SpotifyUserRegisteredDomainEvent {
		const { spotifyUserCountry, spotifyUserDisplayName, spotifyUserEmail, spotifyUserAccessToken } =
			params.attributes;

		return new SpotifyUserRegisteredDomainEvent({
			aggregateId: params.aggregateId,
			eventId: params.eventId,
			occurredOn: params.occurredOn,
			spotifyUserCountry,
			spotifyUserDisplayName,
			spotifyUserEmail,
			spotifyUserAccessToken
		});
	}

	toPrimitives(): SpotifyUserRegisteredDomainEventAttributes {
		const { spotifyUserCountry, spotifyUserDisplayName, spotifyUserEmail, spotifyUserAccessToken } =
			this;

		return { spotifyUserCountry, spotifyUserDisplayName, spotifyUserEmail, spotifyUserAccessToken };
	}
}
