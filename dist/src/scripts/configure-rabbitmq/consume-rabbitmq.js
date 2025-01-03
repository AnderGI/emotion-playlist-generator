"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_injection_1 = __importDefault(require("../../apps/backoffice/backend/dependency-injection"));
const consumeConfigurer = dependency_injection_1.default.get('backoffice.shared.RabbitMqConnection');
const subscribersIds = [...dependency_injection_1.default.findTaggedServiceIds('subscriber').keys()];
const queuesToSubscriber = subscribersIds.map(id => {
    const subscriber = dependency_injection_1.default.get(id);
    const queue = subscriber.queueName();
    return { queue, subscriber };
});
async function main() {
    await consumeConfigurer.connect();
    await consumeConfigurer.consume(queuesToSubscriber);
}
main().catch(err => console.log(err));
