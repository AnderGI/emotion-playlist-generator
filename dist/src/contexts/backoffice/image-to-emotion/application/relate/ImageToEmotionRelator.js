"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImagePath_1 = require("../../../image/domain/ImagePath");
class ImageToEmotionGenerator {
    imageToEmotionGenerator;
    constructor(imageToEmotionGenerator) {
        this.imageToEmotionGenerator = imageToEmotionGenerator;
    }
    async run(event) {
        await this.imageToEmotionGenerator.relate(ImagePath_1.ImagePath.create(event.path));
    }
}
exports.default = ImageToEmotionGenerator;
