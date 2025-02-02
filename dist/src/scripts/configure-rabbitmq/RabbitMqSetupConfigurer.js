"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const amqplib = __importStar(require("amqplib"));
const EXCHANGE_BASE_OPTIONS = {
    durable: true,
    autoDelete: false
};
const QUEUE_BASE_OPTIONS = {
    durable: true,
    autoDelete: false,
    exclusive: false
};
const QUEUE_RETRY_OPTIONS = (exchangeName, queue) => (Object.assign(Object.assign({}, QUEUE_BASE_OPTIONS), { messageTtl: 5000, deadLetterExchange: exchangeName, deadLetterRoutingKey: queue }));
class RabbitMqSetupConfigurer {
    constructor(amqpConnectionSettings) {
        this.amqpConnectionSettings = amqpConnectionSettings;
        this.retrySuffix = 'retry';
        this.deadLetterSuffix = 'dead_letter';
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection && this.channel) {
                return;
            }
            try {
                this.connection = yield this.createConnection();
                this.channel = yield this.createChannel(this.connection);
                console.log('Conexión y canal establecidos exitosamente.');
            }
            catch (err) {
                console.error('Error al conectar con RabbitMQ:', err);
                yield this.close();
                throw err;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.channel) {
                    yield this.channel.close();
                }
                if (this.connection) {
                    yield this.connection.close();
                }
            }
            catch (err) {
                console.error('Error al cerrar la conexión o el canal:', err);
            }
            finally {
                this.connection = undefined;
                this.channel = undefined;
            }
        });
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
            console.log(queueToBindings);
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
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertQueue(queue, QUEUE_BASE_OPTIONS));
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
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertQueue(`${queue}.${this.retrySuffix}`, QUEUE_RETRY_OPTIONS(exchangeName, queue)));
            yield Promise.all([
                ...bindings.map(() => {
                    var _a;
                    return (_a = this.channel) === null || _a === void 0 ? void 0 : _a.bindQueue(`${queue}.${this.retrySuffix}`, `${exchangeName}.${this.retrySuffix}`, queue);
                })
            ]);
        });
    }
    setupDeadLetterQueue(exchangeName, queue, bindings) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // DL queue
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertQueue(`${queue}.${this.deadLetterSuffix}`, QUEUE_BASE_OPTIONS));
            yield Promise.all([
                ...bindings.map(() => {
                    var _a;
                    return (_a = this.channel) === null || _a === void 0 ? void 0 : _a.bindQueue(`${queue}.${this.deadLetterSuffix}`, `${exchangeName}.${this.deadLetterSuffix}`, queue);
                })
            ]);
        });
    }
    declareExchange(exchange) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertExchange(exchange, 'topic', EXCHANGE_BASE_OPTIONS));
        });
    }
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield amqplib.connect(this.amqpConnectionSettings);
                connection.on('error', err => console.error('Error en la conexión:', err));
                connection.on('close', () => console.warn('La conexión a RabbitMQ se cerró.'));
                return connection;
            }
            catch (err) {
                console.error('Error al crear la conexión:', err);
                throw err;
            }
        });
    }
    createChannel(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield connection.createConfirmChannel();
                yield channel.prefetch(1);
                channel.on('error', err => console.error('Error en el canal:', err));
                channel.on('close', () => console.warn('El canal se cerró.'));
                return channel;
            }
            catch (err) {
                console.error('Error al crear el canal:', err);
                throw err;
            }
        });
    }
}
exports.default = RabbitMqSetupConfigurer;
