/* eslint-disable camelcase */
import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type SpotifyUserLoggedInDomainEventAttributes = {
	readonly spotify_id: string;
	readonly spotify_email: string;
	readonly spotify_display_name: string;
	readonly spotify_product: string;
	readonly spotify_uri: string;
	readonly spotify_type: string;
	readonly country: string;
	readonly refresh_token: string;
	readonly access_token: string;
};

export class SpotifyUserLoggedInDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string =
		'andergi.backoffice.spotify-user.event.spotify-user-logged-in.1';

	readonly spotify_id: string;
	readonly spotify_email: string;
	readonly spotify_display_name: string;
	readonly spotify_product: string;
	readonly spotify_uri: string;
	readonly spotify_type: string;
	readonly country: string;
	readonly refresh_token: string;
	readonly access_token: string;
	constructor({
		aggregateId,
		spotify_id,
		spotify_email,
		spotify_display_name,
		spotify_product,
		spotify_uri,
		spotify_type,
		country,
		refresh_token,
		access_token,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		spotify_id: string;
		spotify_email: string;
		spotify_display_name: string;
		spotify_product: string;
		spotify_uri: string;
		spotify_type: string;
		country: string;
		refresh_token: string;
		access_token: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		super({
			eventName: SpotifyUserLoggedInDomainEvent.EVENT_NAME,
			aggregateId,
			eventId,
			occurredOn
		});
		this.spotify_id = spotify_id;
		this.spotify_email = spotify_email;
		this.spotify_display_name = spotify_display_name;
		this.spotify_product = spotify_product;
		this.spotify_uri = spotify_uri;
		this.spotify_type = spotify_type;
		this.country = country;
		this.refresh_token = refresh_token;
		this.access_token = access_token;
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
			spotify_id: attributes.spotify_id,
			spotify_email: attributes.spotify_email,
			spotify_display_name: attributes.spotify_display_name,
			spotify_product: attributes.spotify_product,
			spotify_uri: attributes.spotify_uri,
			spotify_type: attributes.spotify_type,
			country: attributes.country,
			refresh_token: attributes.refresh_token,
			access_token: attributes.access_token,
			eventId,
			occurredOn
		});
	}

	toPrimitives(): SpotifyUserLoggedInDomainEventAttributes {
		const {
			spotify_id,
			spotify_email,
			spotify_display_name,
			spotify_product,
			spotify_uri,
			spotify_type,
			country,
			refresh_token,
			access_token
		} = this;

		return {
			spotify_id,
			spotify_email,
			spotify_display_name,
			spotify_product,
			spotify_uri,
			spotify_type,
			country,
			refresh_token,
			access_token
		};
	}
}
