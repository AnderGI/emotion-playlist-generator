"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFilename = void 0;
const StringValueObject_1 = require("../../../shared/domain/value-object/StringValueObject");
class ImageFilename extends StringValueObject_1.StringValueObject {
    static create(filename) {
        return new ImageFilename(filename);
    }
    getFilename() {
        return this.value;
    }
}
exports.ImageFilename = ImageFilename;
