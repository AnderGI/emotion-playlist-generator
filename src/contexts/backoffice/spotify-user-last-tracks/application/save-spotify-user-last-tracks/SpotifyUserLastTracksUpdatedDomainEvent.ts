import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

type SpotifyUserLastTracksUpdatedDomainEventAttributes = {
	readonly lastTracks: string;
};

export class SpotifyUserLastTracksUpdatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string =
		'andergi.backoffice.spotify-user-last-tracks.event.spotify-user-logged-in.1';

	readonly lastTracks: string;

	constructor({
		aggregateId,
		lastTracks,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		lastTracks: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		super({
			eventName: SpotifyUserLastTracksUpdatedDomainEvent.EVENT_NAME,
			aggregateId,
			eventId,
			occurredOn
		});
		this.lastTracks = lastTracks;
	}

	static fromPrimitives(params: {
		aggregateId: string;
		attributes: SpotifyUserLastTracksUpdatedDomainEventAttributes;
		eventId?: string;
		occurredOn?: Date;
	}): SpotifyUserLastTracksUpdatedDomainEvent {
		const { aggregateId, attributes, occurredOn, eventId } = params;

		return new SpotifyUserLastTracksUpdatedDomainEvent({
			aggregateId,
			lastTracks: attributes.lastTracks,
			eventId,
			occurredOn
		});
	}

	fromReceivedData(data: {
		eventName: string;
		aggregateId: string;
		eventId: string;
		occurredOn: string;
		attributes: any;
	}): DomainEvent {
		return SpotifyUserLastTracksUpdatedDomainEvent.fromPrimitives({
			aggregateId: data.aggregateId,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			attributes: data.attributes,
			eventId: data.eventId,
			occurredOn: new Date(this.occurredOn)
		});
	}

	getEventName(): string {
		return SpotifyUserLastTracksUpdatedDomainEvent.EVENT_NAME;
	}

	toPrimitives(): SpotifyUserLastTracksUpdatedDomainEventAttributes {
		const { lastTracks } = this;

		return {
			lastTracks
		};
	}
}
