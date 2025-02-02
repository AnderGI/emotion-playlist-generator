"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFilenameMother = void 0;
const faker_1 = require("faker");
const ImageFilename_1 = require("../../../../../src/contexts/backoffice/image/domain/ImageFilename");
class ImageFilenameMother {
    static random() {
        return ImageFilename_1.ImageFilename.create(faker_1.system.fileName());
    }
    static create(filename) {
        return ImageFilename_1.ImageFilename.create(filename);
    }
}
exports.ImageFilenameMother = ImageFilenameMother;
