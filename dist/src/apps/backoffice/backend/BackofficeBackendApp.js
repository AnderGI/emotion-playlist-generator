"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
class BackofficeBackendApp {
    server;
    async start() {
        const port = process.env.PORT ?? '5000';
        this.server = new server_1.Server(port);
        return this.server.listen();
    }
    get httpServer() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.server?.getHTTPServer();
    }
    async stop() {
        return this.server?.stop();
    }
}
exports.default = BackofficeBackendApp;
