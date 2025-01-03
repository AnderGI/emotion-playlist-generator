"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_injection_1 = __importDefault(require("../../apps/backoffice/backend/dependency-injection"));
const setupConfigurer = dependency_injection_1.default.get('backoffice.shared.RabbitMqConnection');
const subscribers = dependency_injection_1.default.findTaggedServiceIds('subscriber');
const ids = [...subscribers.keys()];
const queuesToBindings = ids.map(id => {
    const subscriber = dependency_injection_1.default.get(id);
    const queue = subscriber.queueName();
    const bindings = subscriber.subscribedTo().map(event => event.EVENT_NAME);
    return { queue, bindings };
});
async function main() {
    await setupConfigurer.connect();
    await setupConfigurer.declareExchanges();
    await Promise.all(queuesToBindings.map(queueToBindings => setupConfigurer.createQueues(queueToBindings)));
    await setupConfigurer.close();
}
main().catch(err => console.error('error ', err));
