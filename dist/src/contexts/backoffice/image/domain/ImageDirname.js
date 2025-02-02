"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDirname = void 0;
const StringValueObject_1 = require("../../../shared/domain/value-object/StringValueObject");
class ImageDirname extends StringValueObject_1.StringValueObject {
    static create(dirname) {
        return new ImageDirname(dirname);
    }
    getDirname() {
        return this.value;
    }
}
exports.ImageDirname = ImageDirname;
