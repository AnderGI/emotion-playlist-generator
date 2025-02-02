"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateContentType;
const http_status_1 = __importDefault(require("http-status"));
function validateContentType(req, res, next) {
    const contentType = req.headers['content-type'];
    if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('multipart/form-data')) {
        next();
        return;
    }
    res.status(http_status_1.default.UNSUPPORTED_MEDIA_TYPE).send();
}
