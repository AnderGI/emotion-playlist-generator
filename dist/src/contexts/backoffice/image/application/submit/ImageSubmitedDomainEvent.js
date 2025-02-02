"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSubmitedDomainEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/event/DomainEvent");
class ImageSubmitedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, filename, dirname, eventId, occurredOn }) {
        super({ eventName: ImageSubmitedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        this.filename = filename;
        this.dirname = dirname;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new ImageSubmitedDomainEvent({
            aggregateId,
            filename: attributes.filename,
            dirname: attributes.dirname,
            eventId,
            occurredOn
        });
    }
    toPrimitives() {
        const { filename, dirname } = this;
        return {
            filename,
            dirname
        };
    }
}
exports.ImageSubmitedDomainEvent = ImageSubmitedDomainEvent;
ImageSubmitedDomainEvent.EVENT_NAME = 'andergi.backoffice.image.event.image_submited.1';
