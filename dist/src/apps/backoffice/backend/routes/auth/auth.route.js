"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs/promises"));
const querystring_1 = __importDefault(require("querystring"));
const config_1 = __importDefault(require("../../../../../contexts/shared/infrastructure/convict/config/config"));
// request user authorization
const register = (router) => {
    router.get('/auth', (req, res) => {
        const state = crypto.randomBytes(16).toString('hex');
        const query = querystring_1.default.stringify({
            response_type: config_1.default.get('spotify.responseType'),
            client_id: config_1.default.get('spotify.clientId'),
            scope: config_1.default.get('spotify.scope'),
            redirect_uri: config_1.default.get('spotify.redirectUri'),
            state
        });
        fs.writeFile(config_1.default.get('spotify.stateFile'), state, 'utf-8');
        res.redirect(`${config_1.default.get('spotify.userAuthorizationUri')}?${query}`);
    });
};
exports.register = register;
