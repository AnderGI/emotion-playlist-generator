"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagePath = void 0;
const StringValueObject_1 = require("../../../shared/domain/value-object/StringValueObject");
class ImagePath extends StringValueObject_1.StringValueObject {
    path;
    constructor(path) {
        super(path);
        this.path = path;
    }
    static create(path) {
        return new ImagePath(path);
    }
    getPath() {
        return this.path;
    }
}
exports.ImagePath = ImagePath;
