"use strict";
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
exports.Server = void 0;
const body_parser_1 = require("body-parser");
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const express_1 = __importDefault(require("express"));
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
class Server {
    constructor(port) {
        this.port = port;
        this.express = (0, express_1.default)();
        this.express.use((0, body_parser_1.json)());
        this.express.use((0, body_parser_1.urlencoded)({ extended: true }));
        this.express.use(helmet_1.default.xssFilter());
        this.express.use(helmet_1.default.noSniff());
        this.express.use((0, cookie_parser_1.default)());
        this.express.use(helmet_1.default.hidePoweredBy());
        this.express.use(helmet_1.default.frameguard({ action: 'deny' }));
        this.express.use((0, compression_1.default)());
        // Servir archivos estáticos desde la carpeta "public"
        this.express.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        const router = (0, express_promise_router_1.default)();
        router.use((0, errorhandler_1.default)());
        this.express.use(router);
        (0, routes_1.registerRoutes)(router);
        router.use((err, req, res, _next) => {
            console.log(err);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                const env = this.express.get('env');
                this.httpServer = this.express.listen(this.port, () => {
                    console.log(`  Mock Backend App is running at http://localhost:${this.port} in ${env} mode`);
                    console.log('  Press CTRL-C to stop\n');
                    resolve();
                });
            });
        });
    }
    getHTTPServer() {
        return this.httpServer;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.httpServer) {
                    this.httpServer.close(error => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve();
                    });
                }
                resolve();
            });
        });
    }
}
exports.Server = Server;
