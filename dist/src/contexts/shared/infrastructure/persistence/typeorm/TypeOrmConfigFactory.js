"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigFactory = void 0;
const config_1 = __importDefault(require("../../convict/config/config"));
class TypeOrmConfigFactory {
    static createConfig() {
        return {
            host: config_1.default.get('typeorm.host'),
            port: config_1.default.get('typeorm.port'),
            username: config_1.default.get('typeorm.username'),
            password: config_1.default.get('typeorm.password'),
            database: config_1.default.get('typeorm.database')
        };
    }
}
exports.TypeOrmConfigFactory = TypeOrmConfigFactory;
