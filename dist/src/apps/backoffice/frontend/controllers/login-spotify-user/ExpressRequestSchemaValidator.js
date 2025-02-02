"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const http_status_1 = __importDefault(require("http-status"));
class ExpressRequestSchemaValidator {
    constructor(validationChain) {
        this.validationChain = validationChain;
    }
    getValidationChain() {
        return this.validationChain;
    }
    validateRequestSchema(req, res, next) {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            next();
            return;
        }
        const errors = result.array().map((error) => ({ [error.param]: error }));
        res.status(http_status_1.default.UNPROCESSABLE_ENTITY).json(errors);
    }
}
exports.default = ExpressRequestSchemaValidator;
