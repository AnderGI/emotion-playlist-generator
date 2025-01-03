"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageId = void 0;
const UuidValueObject_1 = require("../../../shared/domain/value-object/UuidValueObject");
class ImageId extends UuidValueObject_1.UuidValueObject {
    id;
    constructor(id) {
        super(id);
        this.id = id;
    }
    static create(id) {
        return new ImageId(id);
    }
    getId() {
        return this.id;
    }
}
exports.ImageId = ImageId;
