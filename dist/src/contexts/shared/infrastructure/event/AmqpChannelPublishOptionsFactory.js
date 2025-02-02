"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmqpChannelPublishOptionsFactory = void 0;
const config_1 = __importDefault(require("../convict/config/config"));
class AmqpChannelPublishOptionsFactory {
    static createOptions() {
        return {
            contentType: config_1.default.get('rabbitmq.publishOptions.contentType'),
            contentEncoding: config_1.default.get('rabbitmq.publishOptions.contentEncoding')
        };
    }
}
exports.AmqpChannelPublishOptionsFactory = AmqpChannelPublishOptionsFactory;
