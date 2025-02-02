"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainEventJsonSerializer {
    serialize(event) {
        return JSON.stringify({
            aggregateId: event.eventId,
            eventId: event.aggregateId,
            occurredOn: event.occurredOn,
            eventName: event.eventName,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            attributes: event.toPrimitives()
        });
    }
}
exports.default = DomainEventJsonSerializer;
