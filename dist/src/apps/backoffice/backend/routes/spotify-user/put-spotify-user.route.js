"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_validator_1 = require("express-validator");
const dependency_injection_1 = __importDefault(require("../../dependency-injection"));
// request user authorization
const register = (router) => {
    const controller = dependency_injection_1.default.get('apps.backoffice.SpotifyUserPutController');
    router.put('/spotify-users/:id', [
        (0, express_validator_1.param)('id').isUUID().withMessage('The id parameter must be a valid UUID'),
        (0, express_validator_1.body)('spotifyId').isString().withMessage('spotify_id must be a string'),
        (0, express_validator_1.body)('spotifyEmail').isEmail().withMessage('spotify_email must be a valid email address'),
        (0, express_validator_1.body)('spotifyDisplayName')
            .isString()
            .isLength({ min: 1 })
            .withMessage('spotifyDisplayName must be a non-empty string'),
        (0, express_validator_1.body)('country')
            .isString()
            .isLength({ min: 2, max: 2 })
            .withMessage('country must be a valid 2-letter country code'),
        (0, express_validator_1.body)('refreshToken').isString().withMessage('refresh_token must be a string'),
        (0, express_validator_1.body)('accessToken').isString().withMessage('access_token must be a string')
    ], (req, res, next) => {
        // Verificar si hay errores de validación
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // Si hay errores, devolver 400 con los detalles
            return res.status(400).send();
        }
        next();
    }, (req, res) => {
        const { id } = req.params;
        const data = Object.assign({}, { uuid: id }, req.body);
        controller.run(data);
        res.status(201).send();
    });
};
exports.register = register;
