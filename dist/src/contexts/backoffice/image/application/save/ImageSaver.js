"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSaver = void 0;
const DomainImageSaver_1 = require("../../domain/save/DomainImageSaver");
class ImageSaver {
    imageRepository;
    eventBus;
    constructor(imageRepository, eventBus) {
        this.imageRepository = imageRepository;
        this.eventBus = eventBus;
    }
    async run(command) {
        return DomainImageSaver_1.DomainImageSaver.save(this.imageRepository, this.eventBus)(command);
    }
}
exports.ImageSaver = ImageSaver;
