"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const path_1 = __importDefault(require("path"));
const auth_jwt_middleware_1 = require("../../middlewares/auth-jwt/auth-jwt.middleware");
const register = (router) => {
    router.get('/upload', auth_jwt_middleware_1.authJwt, (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '..', '..', '/public/upload-image.html'));
    });
};
exports.register = register;
