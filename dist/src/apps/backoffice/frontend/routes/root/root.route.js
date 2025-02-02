"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const node_path_1 = __importDefault(require("node:path"));
const register = (router) => {
    router.get('/', (req, res) => {
        res.sendFile(node_path_1.default.join(__dirname, '..', '..', '/public/login.html'));
    });
};
exports.register = register;
