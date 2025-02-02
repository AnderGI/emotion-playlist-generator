"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMother = void 0;
const Image_1 = require("../../../../../src/contexts/backoffice/image/domain/Image");
const ImageDirnameMother_1 = require("./ImageDirnameMother");
const ImageFilenameMother_1 = require("./ImageFilenameMother");
const ImageIdMother_1 = require("./ImageIdMother");
class ImageMother {
    static random() {
        return Image_1.Image.create({
            id: ImageIdMother_1.ImageIdMother.random().getId(),
            filename: ImageFilenameMother_1.ImageFilenameMother.random().getFilename(),
            dirname: ImageDirnameMother_1.ImageDirnameMother.create().getDirname()
        });
    }
    static fromCommand(createImageCommand) {
        return Image_1.Image.create({
            id: createImageCommand.params.id,
            filename: createImageCommand.params.filename,
            dirname: createImageCommand.params.dirname
        });
    }
}
exports.ImageMother = ImageMother;
