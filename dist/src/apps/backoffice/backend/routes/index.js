"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const glob_1 = __importDefault(require("glob"));
function registerRoutes(router) {
    const routes = glob_1.default.sync(`${__dirname}/**/*.route.*`);
    routes.map(route => register(route, router));
}
function register(routePath, router) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const { register } = require(routePath);
    register(router);
}
