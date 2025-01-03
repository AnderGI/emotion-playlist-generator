"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const ImageId_1 = require("./ImageId");
const ImagePath_1 = require("./ImagePath");
class Image {
    id;
    path;
    constructor(id, path) {
        this.id = id;
        this.path = path;
        this.id;
        this.path;
    }
    static create({ id, path }) {
        const image = new Image(ImageId_1.ImageId.create(id), ImagePath_1.ImagePath.create(path));
        return image;
    }
    toPrimitives() {
        return {
            id: this.getId(),
            path: this.getPath()
        };
    }
    equals(other) {
        return this.id === other.id;
    }
    getId() {
        return this.id.getId();
    }
    getPath() {
        return this.path.getPath();
    }
}
exports.Image = Image;
