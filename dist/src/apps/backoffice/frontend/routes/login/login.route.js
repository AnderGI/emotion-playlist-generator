"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const http_status_1 = __importDefault(require("http-status"));
const register = (router) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.get('/login', (req, res) => {
        res.status(http_status_1.default.FOUND).redirect('http://localhost:3000/auth');
        return;
    });
};
exports.register = register;
