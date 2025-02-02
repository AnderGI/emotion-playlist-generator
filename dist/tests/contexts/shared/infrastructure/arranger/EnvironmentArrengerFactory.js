"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_injection_1 = __importDefault(require("../../../../../src/apps/backoffice/backend/dependency-injection"));
const TypeOrmEnvironmentArranger_1 = require("../../../shared/infrastructure/arranger/typeorm/TypeOrmEnvironmentArranger");
class EnvironmentArrengerFactory {
    static getArranger() {
        return new TypeOrmEnvironmentArranger_1.TypeOrmEnvironmentArranger(dependency_injection_1.default.get('backoffice.shared.TypeOrmClientFactory'));
    }
}
exports.default = EnvironmentArrengerFactory;
