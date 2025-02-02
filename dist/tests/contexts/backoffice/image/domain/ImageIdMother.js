"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageIdMother = void 0;
const faker_1 = require("faker");
const ImageId_1 = require("../../../../../src/contexts/backoffice/image/domain/ImageId");
class ImageIdMother {
    static random() {
        return ImageId_1.ImageId.create(faker_1.datatype.uuid());
    }
    static create(id) {
        return ImageId_1.ImageId.create(id);
    }
}
exports.ImageIdMother = ImageIdMother;
