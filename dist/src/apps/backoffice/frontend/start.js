"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BackofficeFrontendApp_1 = __importDefault(require("./BackofficeFrontendApp"));
try {
    new BackofficeFrontendApp_1.default().start();
}
catch (e) {
    console.log(e);
    process.exit(1);
}
process.on('uncaughtException', err => {
    console.log('uncaughtException', err);
    process.exit(1);
});
