"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
class StatusGetController {
    run(req, res) {
        res.status(http_status_1.default.OK).send();
    }
}
exports.default = StatusGetController;
