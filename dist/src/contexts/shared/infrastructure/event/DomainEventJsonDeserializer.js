"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_injection_1 = __importDefault(require("../../../../apps/backoffice/backend/dependency-injection"));
class DomainEventJsonDeserializer {
    constructor(eventMapping) {
        this.eventMapping = eventMapping;
    }
    static create() {
        const subscriberIds = [...dependency_injection_1.default.findTaggedServiceIds('subscriber').keys()];
        const eventMapping = new Map();
        subscriberIds.forEach(subscriberId => {
            const subscriber = dependency_injection_1.default.get(subscriberId);
            subscriber.subscribedTo().forEach(event => {
                eventMapping.set(event.EVENT_NAME, event);
            });
        });
        return new DomainEventJsonDeserializer(eventMapping);
    }
    deserialize(content) {
        console.log(content);
        const jsonStringDomainEvent = JSON.parse(content);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { aggregateId, eventId, occurredOn, attributes, eventName } = jsonStringDomainEvent;
        const DomainEventClass = this.eventMapping.get(eventName);
        if (!DomainEventClass) {
            throw new Error(`DomainEventClass not found for ${eventName}`);
        }
        return DomainEventClass.fromPrimitives({
            aggregateId,
            eventId,
            occurredOn: new Date(occurredOn),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            attributes
        });
    }
}
exports.default = DomainEventJsonDeserializer;
