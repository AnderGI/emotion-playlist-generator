"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_validator_1 = require("express-validator");
const dependency_injection_1 = __importDefault(require("../../dependency-injection"));
const content_type_validator_middleware_1 = __importDefault(require("./middlewares/content-type-validator.middleware"));
const MulterSubmitImageUploader_1 = require("./middlewares/MulterSubmitImageUploader");
const SubmitImageExpressRequestSchemaValidator_1 = __importDefault(require("./middlewares/SubmitImageExpressRequestSchemaValidator"));
const expressRequestSchemaValidator = new SubmitImageExpressRequestSchemaValidator_1.default([
    (0, express_validator_1.body)('fieldname').exists().isString(), // 'image',
    (0, express_validator_1.body)('originalname').exists().isString(), // name.ext
    (0, express_validator_1.body)('encoding').exists().isString(), // 7bit
    (0, express_validator_1.body)('mimetype').exists().isString(), // image/exte
    (0, express_validator_1.body)('destination').exists().isString(), // anbsolute path of root dir
    (0, express_validator_1.body)('filename').exists().isString(), // name
    (0, express_validator_1.body)('path').exists().isString(), // absolute path of file
    (0, express_validator_1.body)('size').exists().isNumeric(), // number
    (0, express_validator_1.body)('id').exists().isUUID('all') // uuid
]);
const multerSubmitImageUploader = new MulterSubmitImageUploader_1.MulterSubmitImageUploader();
const register = (router) => {
    const controller = dependency_injection_1.default.get('apps.backoffice.ImagePutController');
    router.put('/images/:id', content_type_validator_middleware_1.default, multerSubmitImageUploader.handleSingleImageUpload(), (req, res, next) => multerSubmitImageUploader.mutateRequestBody(req, res, next), expressRequestSchemaValidator.getValidationChain(), (req, res, next) => expressRequestSchemaValidator.validateRequestSchema(req, res, next), (req, res) => {
        controller.run(req.body, res);
    });
};
exports.register = register;
