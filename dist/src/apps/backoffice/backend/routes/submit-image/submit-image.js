"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const http_status_1 = __importDefault(require("http-status"));
const dependency_injection_1 = __importDefault(require("../../dependency-injection"));
const register = (router) => {
    const controller = dependency_injection_1.default.get('apps.backoffice.ImagePutController');
    router.put('/images/:id', (req, res) => {
        console.log('backend submit route');
        const data = req.body;
        const { id } = req.params;
        const submitImageRequest = Object.assign(data, { id }, Number(data.size));
        controller.run(submitImageRequest, res);
        res.status(http_status_1.default.OK).send();
    });
};
exports.register = register;
