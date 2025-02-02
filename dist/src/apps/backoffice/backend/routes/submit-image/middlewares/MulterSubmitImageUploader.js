"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterSubmitImageUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class MulterSubmitImageUploader {
    constructor() {
        (this.storage = multer_1.default.diskStorage({
            destination(req, file, cb) {
                cb(null, path_1.default.join(__dirname, '..', '..', '..', '..', '..', '..', '..', 'image-uploads'));
            },
            filename(req, file, cb) {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                cb(null, `${uniqueSuffix}-${file.originalname}`);
            }
        })),
            (this.upload = (0, multer_1.default)({ storage: this.storage }));
    }
    handleSingleImageUpload() {
        return this.upload.single('image');
    }
    mutateRequestBody(req, res, next) {
        const { id } = req.params;
        req.body = Object.assign(Object.assign({}, req.file), { id });
        next();
        return;
    }
}
exports.MulterSubmitImageUploader = MulterSubmitImageUploader;
