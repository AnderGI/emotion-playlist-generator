"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageId = void 0;
const UuidValueObject_1 = require("../../../shared/domain/value-object/UuidValueObject");
class ImageId extends UuidValueObject_1.UuidValueObject {
    static create(id) {
        return new ImageId(id);
    }
    getId() {
        return this.value;
    }
}
exports.ImageId = ImageId;
