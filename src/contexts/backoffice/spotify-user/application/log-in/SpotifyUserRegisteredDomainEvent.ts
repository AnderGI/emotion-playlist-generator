import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type SpotifyUserRegisteredDomainEventConstructorPrimitives = {
	aggregateId: string;
	occurredOn: Date | undefined;
	eventId: string | undefined;
	spotifyDisplayName: string;
	spotifyUri: string;
	spotifyMail: string;
	accessToken: string;
	refreshToken: string;
	productType: string;
	countryCode: string;
	ipAddress: string;
};

type SpotifyUserRegisteredDomainEventAttributes = {
	spotifyDisplayName: string;
	spotifyUri: string;
	spotifyMail: string;
	accessToken: string;
	refreshToken: string;
	productType: string;
	countryCode: string;
	ipAddress: string;
};

export default class SpotifyUserRegisteredDomainEvent extends DomainEvent {
	static EVENT_NAME = 'andergi.backoffice.spotify-user.event.spotify_user_logged_in.1';
	private readonly spotifyDisplayName: string;
	private readonly spotifyUri: string;
	private readonly spotifyMail: string;
	private readonly accessToken: string;
	private readonly refreshToken: string;
	private readonly productType: string;
	private readonly countryCode: string;
	private readonly ipAddress: string;
	constructor({
		aggregateId,
		occurredOn,
		eventId,
		spotifyDisplayName,
		spotifyUri,
		spotifyMail,
		accessToken,
		refreshToken,
		productType,
		countryCode,
		ipAddress
	}: SpotifyUserRegisteredDomainEventConstructorPrimitives) {
		super({
			eventName: SpotifyUserRegisteredDomainEvent.EVENT_NAME,
			aggregateId,
			occurredOn,
			eventId
		});
		(this.spotifyDisplayName = spotifyDisplayName),
			(this.spotifyUri = spotifyUri),
			(this.spotifyMail = spotifyMail),
			(this.accessToken = accessToken),
			(this.refreshToken = refreshToken),
			(this.productType = productType),
			(this.countryCode = countryCode),
			(this.ipAddress = ipAddress);
	}

	static fromPrimitives(params: {
		aggregateId: string;
		eventId?: string;
		occurredOn?: Date;
		attributes: SpotifyUserRegisteredDomainEventAttributes;
	}): SpotifyUserRegisteredDomainEvent {
		const {
			spotifyDisplayName,
			spotifyUri,
			spotifyMail,
			accessToken,
			refreshToken,
			productType,
			countryCode,
			ipAddress
		} = params.attributes;

		return new SpotifyUserRegisteredDomainEvent({
			aggregateId: params.aggregateId,
			eventId: params.eventId,
			occurredOn: params.occurredOn,
			spotifyDisplayName,
			spotifyUri,
			spotifyMail,
			accessToken,
			refreshToken,
			productType,
			countryCode,
			ipAddress
		});
	}

	toPrimitives(): SpotifyUserRegisteredDomainEventAttributes {
		const {
			spotifyDisplayName,
			spotifyUri,
			spotifyMail,
			accessToken,
			refreshToken,
			productType,
			countryCode,
			ipAddress
		} = this;

		return {
			spotifyDisplayName,
			spotifyUri,
			spotifyMail,
			accessToken,
			refreshToken,
			productType,
			countryCode,
			ipAddress
		};
	}
}
