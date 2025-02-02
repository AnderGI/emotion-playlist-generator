"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const node_dependency_injection_1 = require("node-dependency-injection");
const container = new node_dependency_injection_1.ContainerBuilder();
const loader = new node_dependency_injection_1.JsonFileLoader(container);
const env = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'dev';
loader.load(`${__dirname}/application_${env}.json`);
exports.default = container;
