"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainEvent_1 = require("../../../../shared/domain/event/DomainEvent");
class ImageToEmotionRelatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, filename, eventId, occurredOn }) {
        super({
            eventName: ImageToEmotionRelatedDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn
        });
        this.filename = filename;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new ImageToEmotionRelatedDomainEvent({
            aggregateId,
            filename: attributes.filename,
            eventId,
            occurredOn
        });
    }
    toPrimitives() {
        const { filename } = this;
        return {
            filename
        };
    }
}
ImageToEmotionRelatedDomainEvent.EVENT_NAME = 'andergi.backoffice.image-to-emotion.event.image_related_to_emotion.1';
exports.default = ImageToEmotionRelatedDomainEvent;
