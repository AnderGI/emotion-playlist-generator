"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const ImageDirname_1 = require("./ImageDirname");
const ImageFilename_1 = require("./ImageFilename");
const ImageId_1 = require("./ImageId");
class Image {
    constructor(id, filename, dirname) {
        this.id = id;
        this.filename = filename;
        this.dirname = dirname;
        this.id;
        this.filename;
        this.dirname;
    }
    static create(params) {
        const image = new Image(ImageId_1.ImageId.create(params.id), ImageFilename_1.ImageFilename.create(params.filename), ImageDirname_1.ImageDirname.create(params.dirname));
        return image;
    }
    toPrimitives() {
        return {
            id: this.getId(),
            filename: this.getFilename(),
            dirname: this.getDirname()
        };
    }
    equals(other) {
        return this.id === other.id;
    }
    getId() {
        return this.id.getId();
    }
    getFilename() {
        return this.filename.getFilename();
    }
    getDirname() {
        return this.dirname.getDirname();
    }
}
exports.Image = Image;
