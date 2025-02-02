"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageEntity = void 0;
const typeorm_1 = require("typeorm");
const ValueObjectTransformer_1 = require("../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const Image_1 = require("../../../domain/Image");
const ImageDirname_1 = require("../../../domain/ImageDirname");
const ImageFilename_1 = require("../../../domain/ImageFilename");
const ImageId_1 = require("../../../domain/ImageId");
exports.ImageEntity = new typeorm_1.EntitySchema({
    name: 'Image',
    tableName: 'images',
    target: Image_1.Image,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ImageId_1.ImageId)
        },
        filename: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ImageFilename_1.ImageFilename)
        },
        dirname: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(ImageDirname_1.ImageDirname)
        }
    }
});
