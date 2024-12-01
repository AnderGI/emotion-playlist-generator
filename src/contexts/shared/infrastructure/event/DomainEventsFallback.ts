import { DataSource, EntitySchema } from 'typeorm';

import { DomainEvent } from '../../domain/event/DomainEvent';
import { DomainEventEntity } from './DomainEventEntity.entity';

export class DomainEventsFallback {
	constructor(private readonly _client: Promise<DataSource>) {}

	public async fallback(event: DomainEvent): Promise<void> {
		return this.persist(event);
	}

	public entitySchema(): EntitySchema {
		return DomainEventEntity;
	}

	private async client(): Promise<DataSource> {
		return this._client;
	}

	private async repository() {
		return (await this.client()).getRepository(this.entitySchema());
	}

	private async persist(event: DomainEvent): Promise<void> {
		const repository = await this.repository();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await repository.save({
			id: event.eventId, // UUID del evento
			body: {
				aggregateId: event.aggregateId,
				eventId: event.eventId,
				occurredOn: event.occurredOn,
				eventName: event.eventName,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				attributes: event.toPrimitives() // Representación JSON de los atributos del evento
			}
		});
	}
}
