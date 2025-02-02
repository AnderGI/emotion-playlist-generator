"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDirnameMother = void 0;
const faker_1 = require("faker");
const ImageDirname_1 = require("../../../../../src/contexts/backoffice/image/domain/ImageDirname");
class ImageDirnameMother {
    static create(value) {
        return new ImageDirname_1.ImageDirname(value !== null && value !== void 0 ? value : faker_1.system.directoryPath());
    }
}
exports.ImageDirnameMother = ImageDirnameMother;
