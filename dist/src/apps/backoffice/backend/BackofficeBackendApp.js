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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
class BackofficeBackendApp {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000';
            this.server = new server_1.Server(port);
            return this.server.listen();
        });
    }
    get httpServer() {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (_a = this.server) === null || _a === void 0 ? void 0 : _a.getHTTPServer();
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.server) === null || _a === void 0 ? void 0 : _a.stop();
        });
    }
}
exports.default = BackofficeBackendApp;
