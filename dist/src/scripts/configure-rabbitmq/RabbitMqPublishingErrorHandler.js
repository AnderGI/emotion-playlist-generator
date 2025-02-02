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
const buffer_1 = require("buffer");
class RabbitMqPublishingErrorHandler {
    constructor(amqpConnectionSettings, amqpChannelPublishOptions) {
        this.amqpConnectionSettings = amqpConnectionSettings;
        this.amqpChannelPublishOptions = amqpChannelPublishOptions;
    }
    handleRetry(message, queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const redeliveryCount = this.getRedeliveryCount(message);
                if (redeliveryCount < 3) {
                    // Incrementa el redelivery_count y republica en la cola de reintentos
                    yield this.publishToRetry(message, queueName);
                }
                else {
                    // Publica en la Dead Letter Queue después de 3 intentos
                    yield this.publishToDeadLetter(message, queueName);
                }
            }
            catch (err) {
                console.error('Error al manejar el reintento o mover a Dead Letter Queue:', err);
            }
            finally {
                yield this.close();
            }
        });
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
    /**
     * Cierra la conexión y el canal, liberando recursos.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.close();
            yield this.connection.close();
        });
    }
    publishToRetry(message, queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.channel.publish('domain_events.retry', queueName, buffer_1.Buffer.from(message.content.toString()), Object.assign(Object.assign({}, this.amqpChannelPublishOptions), { 
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
                this.channel.publish('domain_events.dead_letter', queueName, buffer_1.Buffer.from(message.content.toString()), Object.assign(Object.assign({}, this.amqpChannelPublishOptions), { 
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
    getRedeliveryCount(message) {
        console.log(message);
        if (!message.properties.headers) {
            message.properties.headers = {}; // Inicializar headers si no existe
        }
        if (!message.properties.headers.redelivery_count) {
            message.properties.headers.redelivery_count = 1;
        }
        else {
            message.properties.headers.redelivery_count += 1;
        }
        const count = message.properties.headers.redelivery_count;
        return count;
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
exports.default = RabbitMqPublishingErrorHandler;
