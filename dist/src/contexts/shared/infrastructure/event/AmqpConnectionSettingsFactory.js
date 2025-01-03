"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmqpConnectionSettingsFactory = void 0;
const config_1 = __importDefault(require("../convict/config/config"));
class AmqpConnectionSettingsFactory {
    static createConnection() {
        return {
            protocol: config_1.default.get('rabbitmq.connectionSettings.protocol'),
            hostname: config_1.default.get('rabbitmq.connectionSettings.hostname'),
            port: config_1.default.get('rabbitmq.connectionSettings.port'),
            username: config_1.default.get('rabbitmq.connectionSettings.username'),
            password: config_1.default.get('rabbitmq.connectionSettings.password'),
            vhost: config_1.default.get('rabbitmq.connectionSettings.vhost')
        };
    }
}
exports.AmqpConnectionSettingsFactory = AmqpConnectionSettingsFactory;
