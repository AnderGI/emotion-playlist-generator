import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type SpotifyUserRegisteredDomainEventConstructorPrimitives = {
	aggregateId: string;
	occurredOn: Date | undefined;
	eventId: string | undefined;
	spotifyUserCountry: string;
	spotifyUserDisplayName: string;
	spotifyUserEmail: string;
	spotifyUserIpAddress: string;
	spotifyUserAccessToken: string;
	spotifyUserRefreshToken: string;
};

type SpotifyUserRegisteredDomainEventAttributes = {
	spotifyUserCountry: string;
	spotifyUserDisplayName: string;
	spotifyUserEmail: string;
	spotifyUserIpAddress: string;
	spotifyUserAccessToken: string;
	spotifyUserRefreshToken: string;
};

export default class SpotifyUserRegisteredDomainEvent extends DomainEvent {
	static EVENT_NAME = 'andergi.backoffice.spotify-user.event.spotify_user_registered.1';
	private readonly spotifyUserCountry: string;
	private readonly spotifyUserDisplayName: string;
	private readonly spotifyUserEmail: string;
	private readonly spotifyUserIpAddress: string;
	private readonly spotifyUserAccessToken: string;
	private readonly spotifyUserRefreshToken: string;
	constructor({
		aggregateId,
		occurredOn,
		eventId,
		spotifyUserCountry,
		spotifyUserDisplayName,
		spotifyUserEmail,
		spotifyUserIpAddress,
		spotifyUserAccessToken,
		spotifyUserRefreshToken
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
		this.spotifyUserIpAddress = spotifyUserIpAddress;
		this.spotifyUserAccessToken = spotifyUserAccessToken;
		this.spotifyUserRefreshToken = spotifyUserRefreshToken;
	}

	static fromPrimitives(params: {
		aggregateId: string;
		eventId?: string;
		occurredOn?: Date;
		attributes: SpotifyUserRegisteredDomainEventAttributes;
	}): SpotifyUserRegisteredDomainEvent {
		const {
			spotifyUserCountry,
			spotifyUserDisplayName,
			spotifyUserEmail,
			spotifyUserIpAddress,
			spotifyUserAccessToken,
			spotifyUserRefreshToken
		} = params.attributes;

		return new SpotifyUserRegisteredDomainEvent({
			aggregateId: params.aggregateId,
			eventId: params.eventId,
			occurredOn: params.occurredOn,
			spotifyUserCountry,
			spotifyUserDisplayName,
			spotifyUserEmail,
			spotifyUserIpAddress,
			spotifyUserAccessToken,
			spotifyUserRefreshToken
		});
	}

	toPrimitives(): SpotifyUserRegisteredDomainEventAttributes {
		const {
			spotifyUserCountry,
			spotifyUserDisplayName,
			spotifyUserEmail,
			spotifyUserIpAddress,
			spotifyUserAccessToken,
			spotifyUserRefreshToken
		} = this;

		return {
			spotifyUserCountry,
			spotifyUserDisplayName,
			spotifyUserEmail,
			spotifyUserIpAddress,
			spotifyUserAccessToken,
			spotifyUserRefreshToken
		};
	}
}
