"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const UuidValueObject_1 = require("../value-object/UuidValueObject");
class DomainEvent {
    static EVENT_NAME;
    aggregateId;
    eventId;
    occurredOn;
    eventName;
    constructor(params) {
        const { aggregateId, eventName, eventId, occurredOn } = params;
        this.aggregateId = aggregateId;
        this.eventId = eventId ?? UuidValueObject_1.UuidValueObject.random();
        this.occurredOn = occurredOn ?? new Date();
        this.eventName = eventName;
    }
}
exports.DomainEvent = DomainEvent;
