"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCreatedDomainEventMother = void 0;
const ImageSubmitedDomainEvent_1 = require("../../../../../src/contexts/backoffice/image/application/submit/ImageSubmitedDomainEvent");
const ImageMother_1 = require("./ImageMother");
class ImageCreatedDomainEventMother {
    static create(image) {
        return ImageSubmitedDomainEvent_1.ImageSubmitedDomainEvent.fromPrimitives({
            aggregateId: image.getId(),
            attributes: {
                filename: image.getFilename(),
                dirname: image.getDirname()
            }
        });
    }
    static fromRandomImage() {
        const image = ImageMother_1.ImageMother.random();
        return ImageCreatedDomainEventMother.create(image);
    }
}
exports.ImageCreatedDomainEventMother = ImageCreatedDomainEventMother;
