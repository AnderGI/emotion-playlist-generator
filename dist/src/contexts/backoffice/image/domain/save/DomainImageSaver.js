"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainImageSaver = void 0;
const ImageCreatedDomainEvent_1 = require("../../application/save/ImageCreatedDomainEvent");
const Image_1 = require("../Image");
class DomainImageSaver {
    static save(imageRepository, eventBus) {
        return async (command) => {
            const { id, path } = command;
            const image = Image_1.Image.create({ id, path });
            await imageRepository.save(image);
            await eventBus.publish(ImageCreatedDomainEvent_1.ImageCreatedDomainEvent.fromPrimitives({
                aggregateId: image.getId(),
                attributes: {
                    path: image.getPath()
                }
            }));
            return Promise.resolve();
        };
    }
}
exports.DomainImageSaver = DomainImageSaver;
