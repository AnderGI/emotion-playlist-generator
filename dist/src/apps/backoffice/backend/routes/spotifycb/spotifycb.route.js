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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const fs = __importStar(require("fs"));
const http_status_1 = __importDefault(require("http-status"));
const jwt = __importStar(require("jsonwebtoken"));
const querystring_1 = __importDefault(require("querystring"));
const UuidValueObject_1 = require("../../../../../contexts/shared/domain/value-object/UuidValueObject");
const config_1 = __importDefault(require("../../../../../contexts/shared/infrastructure/convict/config/config"));
const register = (router) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.get('/spotifycb', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        const code = req.query.code;
        const receivedState = req.query.state;
        if (!code || !receivedState) {
            res.status(http_status_1.default.BAD_REQUEST).json({ error: 'missing code or state' });
            return;
        }
        const generatedStatus = fs.readFileSync(config_1.default.get('spotify.stateFile'), 'utf-8');
        if (generatedStatus !== receivedState) {
            res.status(http_status_1.default.FORBIDDEN).json({ error: 'state mismatch error' });
            return;
        }
        // Request an access token
        const authOptions = {
            grant_type: config_1.default.get('spotify.grantType'),
            code,
            redirect_uri: config_1.default.get('spotify.redirectUri')
        };
        // request access token
        const data = yield fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${config_1.default.get('spotify.clientId')}:${config_1.default.get('spotify.clientSecret')}`).toString('base64')}`
            },
            body: querystring_1.default.stringify(authOptions)
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const json = yield data.json();
        // eslint-disable-next-line camelcase
        const { access_token, refresh_token } = json;
        const userData = yield fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${json.access_token}`
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const user = yield userData.json();
        // eslint-disable-next-line camelcase
        const { email, display_name, id } = user;
        // Carga las claves
        const privateKey = fs.readFileSync(config_1.default.get('system.privateKey'), 'utf8');
        const token = jwt.sign(
        // eslint-disable-next-line camelcase
        { email, display_name, access_token, id }, privateKey, {
            algorithm: 'RS256',
            expiresIn: '15 minutes'
        });
        // call spotifyuserput route
        const uuid = UuidValueObject_1.UuidValueObject.random();
        const dataForPut = {
            spotifyId: user.id,
            spotifyEmail: user.email,
            spotifyDisplayName: user.display_name,
            country: user.country,
            // eslint-disable-next-line camelcase
            refreshToken: refresh_token,
            // eslint-disable-next-line camelcase
            accessToken: access_token
        };
        console.log(dataForPut);
        // backend
        fetch(`http://localhost:3000/spotify-users/${uuid}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForPut)
        });
        res
            .cookie('access_token', token, {
            httpOnly: true,
            maxAge: 5 * 60 * 1 * 1000 // 15 min * 1000 ms
        })
            .redirect('http://localhost:3001/upload');
    }));
};
exports.register = register;
