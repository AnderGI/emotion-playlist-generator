"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventsFallback = void 0;
const DomainEventEntity_entity_1 = require("./DomainEventEntity.entity");
class DomainEventsFallback {
    _client;
    constructor(_client) {
        this._client = _client;
    }
    async fallback(event) {
        return this.persist(event);
    }
    entitySchema() {
        return DomainEventEntity_entity_1.DomainEventEntity;
    }
    async client() {
        return this._client;
    }
    async repository() {
        return (await this.client()).getRepository(this.entitySchema());
    }
    async persist(event) {
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
exports.DomainEventsFallback = DomainEventsFallback;
