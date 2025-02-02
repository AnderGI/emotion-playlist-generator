"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const UuidValueObject_1 = require("../value-object/UuidValueObject");
class DomainEvent {
    constructor(params) {
        const { aggregateId, eventName, eventId, occurredOn } = params;
        this.aggregateId = aggregateId;
        this.eventId = eventId !== null && eventId !== void 0 ? eventId : UuidValueObject_1.UuidValueObject.random();
        this.occurredOn = occurredOn !== null && occurredOn !== void 0 ? occurredOn : new Date();
        this.eventName = eventName;
    }
}
exports.DomainEvent = DomainEvent;
