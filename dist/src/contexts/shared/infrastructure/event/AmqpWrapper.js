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
exports.AmqpWrapper = void 0;
const amqplib = __importStar(require("amqplib"));
class AmqpWrapper {
    constructor(amqpConnectionSettings, amqpChannelPublishOptions) {
        this.amqpConnectionSettings = amqpConnectionSettings;
        this.amqpChannelPublishOptions = amqpChannelPublishOptions;
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
            }
            catch (err) {
                console.error('Error al conectar con RabbitMQ:', err);
                yield this.close();
                throw err;
            }
        });
    }
    /**
     * Publica un mensaje en un exchange de RabbitMQ.
     * Lanza un error si no hay un canal activo.
     *
     * @param params Objeto con exchange, routingKey, messageId y datos del mensaje.
     */
    publish(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            this.ensureChannelAvailable();
            const { exchange, routingKey, messageId, data } = params;
            try {
                yield this.publishMessage(exchange, routingKey, messageId, data);
            }
            catch (err) {
                console.error('Error al publicar el mensaje:', err);
                throw err;
            }
        });
    }
    /**
     * Cierra la conexión y el canal, liberando recursos.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.channel) {
                    yield this.channel.close();
                }
                if (this.connection) {
                    yield this.connection.close();
                    console.log('Conexión cerrada.');
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
            console.log(queue);
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
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertQueue(`${queue}.${this.deadLetterSuffix}`, {
                durable: true,
                autoDelete: false,
                exclusive: false
            }));
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
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertExchange(exchange, 'topic', {
                durable: true,
                autoDelete: false
            }));
        });
    }
    ensureChannelAvailable() {
        if (!this.channel) {
            throw new Error('El canal no está disponible. Asegúrate de llamar a connect() antes de publicar.');
        }
    }
    publishMessage(exchange, routingKey, messageId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var _a;
                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.publish(exchange, routingKey, Buffer.from(data), Object.assign(Object.assign({}, this.amqpChannelPublishOptions), { messageId }), err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
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
exports.AmqpWrapper = AmqpWrapper;
