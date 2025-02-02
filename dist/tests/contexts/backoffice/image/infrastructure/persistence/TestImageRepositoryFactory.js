"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_injection_1 = __importDefault(require("../../../../../../src/apps/backoffice/backend/dependency-injection"));
class TestImageRepositoryFactory {
    static getRepository() {
        return dependency_injection_1.default.get('backoffice.image.ImageRepository');
    }
}
exports.default = TestImageRepositoryFactory;
