"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCreatedDomainEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/event/DomainEvent");
class ImageCreatedDomainEvent extends DomainEvent_1.DomainEvent {
    static EVENT_NAME = 'andergi.backoffice.image.event.image_created.1';
    path;
    constructor({ aggregateId, path, eventId, occurredOn }) {
        super({ eventName: ImageCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        this.path = path;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new ImageCreatedDomainEvent({
            aggregateId,
            path: attributes.path,
            eventId,
            occurredOn
        });
    }
    toPrimitives() {
        const { path } = this;
        return {
            path
        };
    }
}
exports.ImageCreatedDomainEvent = ImageCreatedDomainEvent;
