"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageFilename_1 = require("../../image/domain/ImageFilename");
class ImageToEmotion {
    constructor(filename) {
        this.filename = filename;
    }
    static create({ filename }) {
        return new ImageToEmotion(ImageFilename_1.ImageFilename.create(filename));
    }
    getFilename() {
        return this.filename.getValue();
    }
    toPrimitives() {
        return {
            filename: this.filename.getValue()
        };
    }
}
exports.default = ImageToEmotion;
