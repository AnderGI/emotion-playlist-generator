"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_dependency_injection_1 = require("node-dependency-injection");
const container = new node_dependency_injection_1.ContainerBuilder();
const loader = new node_dependency_injection_1.JsonFileLoader(container);
const env = process.env.NODE_ENV ?? 'dev';
loader.load(`${__dirname}/application_${env}.json`);
exports.default = container;
