"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqSetupConfigurator = void 0;
// type QueueToBindings = {
// 	queue: string;
// 	bindings: string[];
// };
/**
 * Configurator for RabbitMQ exchanges, queues, and bindings.
 */
class RabbitMqSetupConfigurator {
    constructor() {
        this.retrySuffix = 'retry';
        this.deadLetterSuffix = 'dead_letter';
    }
    declareExchanges(exchange) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.declareExchange(exchange),
                this.declareExchange(`${exchange}.${this.retrySuffix}`),
                this.declareExchange(`${exchange}.${this.deadLetterSuffix}`)
            ]);
        });
    }
    createQueues(exchangeName, queueToBindings) {
        return __awaiter(this, void 0, void 0, function* () {
            const { queue, bindings } = queueToBindings;
            yield Promise.all([
                this.setupBaseQueue(exchangeName, queue, bindings),
                this.setupRetryQueue(exchangeName, queue, bindings),
                this.setupDeadLetterQueue(exchangeName, queue, bindings)
            ]);
        });
    }
    setupBaseQueue(exchangeName, queue, bindings) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Base queue
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertQueue(queue, {
                durable: true,
                autoDelete: false,
                exclusive: false
            }));
            yield Promise.all([
                ...bindings.map(binding => { var _a; return (_a = this.channel) === null || _a === void 0 ? void 0 : _a.bindQueue(queue, exchangeName, binding); }),
                (_b = this.channel) === null || _b === void 0 ? void 0 : _b.bindQueue(queue, exchangeName, queue)
            ]);
        });
    }
    setupRetryQueue(exchangeName, queue, bindings) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Retry queue
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertQueue(`${queue}.${this.retrySuffix}`, {
                durable: true,
                autoDelete: false,
                exclusive: false,
                messageTtl: 5000,
                deadLetterExchange: exchangeName,
                deadLetterRoutingKey: queue
            }));
            yield Promise.all([
                ...bindings.map(binding => {
                    var _a;
                    return (_a = this.channel) === null || _a === void 0 ? void 0 : _a.bindQueue(`${queue}.${this.retrySuffix}`, `${exchangeName}.${this.retrySuffix}`, binding);
                })
            ]);
        });
    }
    setupDeadLetterQueue(exchangeName, queue, bindings) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // DL queue
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertQueue(`${queue}.${this.deadLetterSuffix}`, {
                durable: true,
                autoDelete: false,
                exclusive: false
            }));
            yield Promise.all([
                ...bindings.map(binding => {
                    var _a;
                    return (_a = this.channel) === null || _a === void 0 ? void 0 : _a.bindQueue(`${queue}.${this.deadLetterSuffix}`, `${exchangeName}.${this.deadLetterSuffix}`, binding);
                })
            ]);
        });
    }
    /**
     *
     * @param exchange Name of the exchange to which domain events will be published
     * Base, Retry and Dead Letter exchange will be created
     */
    declareExchange(exchange) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertExchange(exchange, 'topic', {
                durable: true,
                autoDelete: false
            }));
        });
    }
}
exports.RabbitMqSetupConfigurator = RabbitMqSetupConfigurator;
