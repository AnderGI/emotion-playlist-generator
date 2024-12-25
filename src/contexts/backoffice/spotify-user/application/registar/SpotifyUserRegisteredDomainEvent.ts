import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type SpotifyUserRegisteredDomainEventConstructorPrimitives = {
	aggregateId: string;
	occurredOn: Date | undefined;
	eventId: string | undefined;
	spotifyUserCountry: string;
	spotifyUserDisplayName: string;
	spotifyUserEmail: string;
};

type SpotifyUserRegisteredDomainEventAttributes = {
	spotifyUserCountry: string;
	spotifyUserDisplayName: string;
	spotifyUserEmail: string;
};

export default class SpotifyUserRegisteredDomainEvent extends DomainEvent {
	static EVENT_NAME = 'andergi.backoffice.spotify-user.event.spotify_user_registered.1';
	private readonly spotifyUserCountry: string;
	private readonly spotifyUserDisplayName: string;
	private readonly spotifyUserEmail: string;
	constructor({
		aggregateId,
		occurredOn,
		eventId,
		spotifyUserCountry,
		spotifyUserDisplayName,
		spotifyUserEmail
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
	}

	static fromPrimitives(params: {
		aggregateId: string;
		eventId?: string;
		occurredOn?: Date;
		attributes: SpotifyUserRegisteredDomainEventAttributes;
	}): SpotifyUserRegisteredDomainEvent {
		const { spotifyUserCountry, spotifyUserDisplayName, spotifyUserEmail } = params.attributes;

		return new SpotifyUserRegisteredDomainEvent({
			aggregateId: params.aggregateId,
			eventId: params.eventId,
			occurredOn: params.occurredOn,
			spotifyUserCountry,
			spotifyUserDisplayName,
			spotifyUserEmail
		});
	}

	toPrimitives(): SpotifyUserRegisteredDomainEventAttributes {
		const { spotifyUserCountry, spotifyUserDisplayName, spotifyUserEmail } = this;

		return { spotifyUserCountry, spotifyUserDisplayName, spotifyUserEmail };
	}
}
