"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainImageSaver = void 0;
const ImageSubmitedDomainEvent_1 = require("../../application/submit/ImageSubmitedDomainEvent");
const Image_1 = require("../Image");
class DomainImageSaver {
    static save(imageRepository, eventBus) {
        return (command) => __awaiter(this, void 0, void 0, function* () {
            const { id, filename, dirname } = command.params;
            const image = Image_1.Image.create({ id, filename, dirname });
            yield imageRepository.save(image);
            const event = ImageSubmitedDomainEvent_1.ImageSubmitedDomainEvent.fromPrimitives({
                aggregateId: image.getId(),
                attributes: {
                    filename: image.getFilename(),
                    dirname: image.getDirname()
                }
            });
            yield eventBus.publish(event);
            return Promise.resolve();
        });
    }
}
exports.DomainImageSaver = DomainImageSaver;
