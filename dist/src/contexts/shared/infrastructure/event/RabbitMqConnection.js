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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib = __importStar(require("amqplib"));
const config_1 = __importDefault(require("../../../../shared/infrastructure/winston/config"));
class RabbitMqConnection {
    constructor(amqpConnectionSettings, amqpChannelPublishOptions, domainEventJsonDeserializer) {
        this.amqpConnectionSettings = amqpConnectionSettings;
        this.amqpChannelPublishOptions = amqpChannelPublishOptions;
        this.domainEventJsonDeserializer = domainEventJsonDeserializer;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
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
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.channel.close();
                yield this.connection.close();
                console.log('Conexión cerrada.');
            }
            catch (err) {
                console.error('Error al cerrar la conexión o el canal:', err);
            }
        });
    }
    consume(queuesToSubscribers) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(queuesToSubscribers.map(queueToSusbcriber => this.channel.consume(queueToSusbcriber.queue, 
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            this._consume(queueToSusbcriber.subscriber, this.channel))));
        });
    }
    publish(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const { routingKey, messageId, data } = params;
            try {
                yield this.publishMessage(RabbitMqConnection.EXCHANGE_NAME, routingKey, messageId, data);
            }
            catch (err) {
                console.error('Error al publicar el mensaje:', err);
                throw err;
            }
        });
    }
    declareExchanges() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.declareExchange(RabbitMqConnection.EXCHANGE_NAME),
                this.declareExchange(`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.RETRY_SUFFIX}`),
                this.declareExchange(`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`)
            ]);
        });
    }
    createQueues(queueToBindings) {
        return __awaiter(this, void 0, void 0, function* () {
            const { queue, bindings } = queueToBindings;
            yield Promise.all([
                this.setupBaseQueue(RabbitMqConnection.EXCHANGE_NAME, queue, bindings),
                this.setupRetryQueue(RabbitMqConnection.EXCHANGE_NAME, queue, bindings),
                this.setupDeadLetterQueue(RabbitMqConnection.EXCHANGE_NAME, queue, bindings)
            ]);
        });
    }
    _consume(subscriber, channel) {
        return (msg) => __awaiter(this, void 0, void 0, function* () {
            if (msg === null) {
                return;
            }
            try {
                // Procesar el mensaje
                yield subscriber.on(this.domainEventJsonDeserializer.deserialize(msg.content.toString()));
                // Confirmar el mensaje como procesado
                channel.ack(msg);
            }
            catch (error) {
                // Manejar el error y determinar si debe reintentarse o moverse a Dead Letter
                config_1.default.error(`Error procesando mensaje: ${msg.content.toString()}. Error:`, error);
                try {
                    yield this.handleRetry(msg, subscriber.queueName());
                }
                catch (retryError) {
                    config_1.default.error(`Error manejando reintento o Dead Letter:`, retryError);
                }
                finally {
                    // No hacer ack. Indicar a RabbitMQ que no se procesó correctamente
                    channel.nack(msg, false, false); // No requeue: false, no múltiple: false
                }
            }
        });
    }
    handleRetry(message, queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.hasBennRedeliveredTooManyTimes(message)) {
                    yield this.publishToRetry(message, queueName);
                }
                else {
                    yield this.publishToDeadLetter(message, queueName);
                }
            }
            catch (err) {
                console.error('Error al manejar el reintento o mover a Dead Letter Queue:', err);
            }
        });
    }
    publishToRetry(message, queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.channel.publish(`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.RETRY_SUFFIX}`, queueName, Buffer.from(message.content.toString()), Object.assign(Object.assign({}, this.amqpChannelPublishOptions), { 
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    messageId: message.properties.messageId, headers: Object.assign({}, message.properties.headers) }), err => {
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
    publishToDeadLetter(message, queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.channel.publish(`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`, queueName, Buffer.from(message.content.toString()), Object.assign(Object.assign({}, this.amqpChannelPublishOptions), { 
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    messageId: message.properties.messageId, headers: Object.assign({}, message.properties.headers) }), err => {
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
    hasBennRedeliveredTooManyTimes(message) {
        if (!message.properties.headers) {
            message.properties.headers = {};
        }
        if (!message.properties.headers.redelivery_count) {
            message.properties.headers.redelivery_count = 1;
        }
        else {
            message.properties.headers.redelivery_count += 1;
        }
        return message.properties.headers.redelivery_count < 3;
    }
    setupBaseQueue(exchangeName, queue, bindings) {
        return __awaiter(this, void 0, void 0, function* () {
            // Base queue
            yield this.channel.assertQueue(queue, RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS);
            yield Promise.all([
                ...bindings.map(binding => this.channel.bindQueue(queue, exchangeName, binding)),
                this.channel.bindQueue(queue, exchangeName, queue)
            ]);
        });
    }
    setupRetryQueue(exchangeName, queue, bindings) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(`${queue}.${RabbitMqConnection.RETRY_SUFFIX}`, Object.assign({}, RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS, {
                messageTtl: RabbitMqConnection.TIME_FOR_MESSAGE_TO_LEAVE_QUEUE_MS,
                deadLetterExchange: exchangeName,
                deadLetterRoutingKey: queue
            }));
            yield Promise.all([
                ...bindings.map(() => this.channel.bindQueue(`${queue}.${RabbitMqConnection.RETRY_SUFFIX}`, `${exchangeName}.${RabbitMqConnection.RETRY_SUFFIX}`, queue))
            ]);
        });
    }
    setupDeadLetterQueue(exchangeName, queue, bindings) {
        return __awaiter(this, void 0, void 0, function* () {
            // DL queue
            yield this.channel.assertQueue(`${queue}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`, RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS);
            yield Promise.all([
                ...bindings.map(() => this.channel.bindQueue(`${queue}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`, `${exchangeName}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`, queue))
            ]);
        });
    }
    declareExchange(exchange) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertExchange(exchange, 'topic', {
                durable: true,
                autoDelete: false
            });
        });
    }
    publishMessage(exchange, routingKey, messageId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.channel.publish(exchange, routingKey, Buffer.from(data), Object.assign(Object.assign({}, this.amqpChannelPublishOptions), { messageId }), err => {
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
RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS = {
    durable: true,
    autoDelete: false,
    exclusive: false
};
RabbitMqConnection.EXCHANGE_NAME = `andergi.domain_events`;
RabbitMqConnection.RETRY_SUFFIX = `retry`;
RabbitMqConnection.DEAD_LETTER_SUFFIX = 'dead_letter';
RabbitMqConnection.TIME_FOR_MESSAGE_TO_LEAVE_QUEUE_MS = 5000;
exports.default = RabbitMqConnection;
