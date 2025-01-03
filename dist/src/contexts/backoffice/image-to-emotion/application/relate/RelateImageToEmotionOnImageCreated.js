"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelateImageToEmotionOnImageCreated = void 0;
const ImageCreatedDomainEvent_1 = require("../../../image/application/save/ImageCreatedDomainEvent");
class RelateImageToEmotionOnImageCreated {
    imageToEmotionRelator;
    constructor(imageToEmotionRelator) {
        this.imageToEmotionRelator = imageToEmotionRelator;
    }
    subscribedTo() {
        return [ImageCreatedDomainEvent_1.ImageCreatedDomainEvent];
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async on(domainEvent) {
        await this.imageToEmotionRelator.run(domainEvent);
    }
    queueName() {
        return 'andergi.backoffice.image-to-emotion.relate_image_to_emotion_on_image_created';
    }
}
exports.RelateImageToEmotionOnImageCreated = RelateImageToEmotionOnImageCreated;
