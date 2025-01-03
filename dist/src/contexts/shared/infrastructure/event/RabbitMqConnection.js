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
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib = __importStar(require("amqplib"));
class RabbitMqConnection {
    amqpConnectionSettings;
    amqpChannelPublishOptions;
    domainEventJsonDeserializer;
    static CREATE_QUEUE_COMMON_OPTIONS = {
        durable: true,
        autoDelete: false,
        exclusive: false
    };
    static EXCHANGE_NAME = `andergi.domain_events`;
    static RETRY_SUFFIX = `retry`;
    static DEAD_LETTER_SUFFIX = 'dead_letter';
    static TIME_FOR_MESSAGE_TO_LEAVE_QUEUE_MS = 5000;
    connection;
    channel;
    constructor(amqpConnectionSettings, amqpChannelPublishOptions, domainEventJsonDeserializer) {
        this.amqpConnectionSettings = amqpConnectionSettings;
        this.amqpChannelPublishOptions = amqpChannelPublishOptions;
        this.domainEventJsonDeserializer = domainEventJsonDeserializer;
    }
    async connect() {
        try {
            this.connection = await this.createConnection();
            this.channel = await this.createChannel(this.connection);
        }
        catch (err) {
            console.error('Error al conectar con RabbitMQ:', err);
            await this.close();
            throw err;
        }
    }
    async close() {
        try {
            await this.channel.close();
            await this.connection.close();
            console.log('Conexión cerrada.');
        }
        catch (err) {
            console.error('Error al cerrar la conexión o el canal:', err);
        }
    }
    async consume(queuesToSubscribers) {
        await Promise.all(queuesToSubscribers.map(queueToSusbcriber => this.channel.consume(queueToSusbcriber.queue, 
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this._consume(queueToSusbcriber.subscriber, this.channel))));
    }
    async publish(params) {
        await this.connect();
        const { routingKey, messageId, data } = params;
        try {
            await this.publishMessage(RabbitMqConnection.EXCHANGE_NAME, routingKey, messageId, data);
        }
        catch (err) {
            console.error('Error al publicar el mensaje:', err);
            throw err;
        }
    }
    async declareExchanges() {
        await Promise.all([
            this.declareExchange(RabbitMqConnection.EXCHANGE_NAME),
            this.declareExchange(`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.RETRY_SUFFIX}`),
            this.declareExchange(`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`)
        ]);
    }
    async createQueues(queueToBindings) {
        const { queue, bindings } = queueToBindings;
        await Promise.all([
            this.setupBaseQueue(RabbitMqConnection.EXCHANGE_NAME, queue, bindings),
            this.setupRetryQueue(RabbitMqConnection.EXCHANGE_NAME, queue, bindings),
            this.setupDeadLetterQueue(RabbitMqConnection.EXCHANGE_NAME, queue, bindings)
        ]);
    }
    _consume(subscriber, channel) {
        return (msg) => {
            if (msg !== null) {
                subscriber
                    .on(this.domainEventJsonDeserializer.deserialize(msg.content.toString()))
                    .catch(() => {
                    this.handleRetry(msg, subscriber.queueName());
                })
                    .finally(() => {
                    channel.ack(msg);
                });
            }
        };
    }
    async handleRetry(message, queueName) {
        try {
            if (this.hasBennRedeliveredTooManyTimes(message)) {
                await this.publishToRetry(message, queueName);
            }
            else {
                await this.publishToDeadLetter(message, queueName);
            }
        }
        catch (err) {
            console.error('Error al manejar el reintento o mover a Dead Letter Queue:', err);
        }
    }
    async publishToRetry(message, queueName) {
        return new Promise((resolve, reject) => {
            this.channel.publish(`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.RETRY_SUFFIX}`, queueName, Buffer.from(message.content.toString()), {
                ...this.amqpChannelPublishOptions,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                messageId: message.properties.messageId,
                headers: {
                    ...message.properties.headers
                }
            }, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async publishToDeadLetter(message, queueName) {
        return new Promise((resolve, reject) => {
            this.channel.publish(`${RabbitMqConnection.EXCHANGE_NAME}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`, queueName, Buffer.from(message.content.toString()), {
                ...this.amqpChannelPublishOptions,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                messageId: message.properties.messageId,
                headers: {
                    ...message.properties.headers
                }
            }, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
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
    async setupBaseQueue(exchangeName, queue, bindings) {
        // Base queue
        await this.channel.assertQueue(queue, RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS);
        await Promise.all([
            ...bindings.map(binding => this.channel.bindQueue(queue, exchangeName, binding)),
            this.channel.bindQueue(queue, exchangeName, queue)
        ]);
    }
    async setupRetryQueue(exchangeName, queue, bindings) {
        await this.channel.assertQueue(`${queue}.${RabbitMqConnection.RETRY_SUFFIX}`, Object.assign({}, RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS, {
            messageTtl: RabbitMqConnection.TIME_FOR_MESSAGE_TO_LEAVE_QUEUE_MS,
            deadLetterExchange: exchangeName,
            deadLetterRoutingKey: queue
        }));
        await Promise.all([
            ...bindings.map(() => this.channel.bindQueue(`${queue}.${RabbitMqConnection.RETRY_SUFFIX}`, `${exchangeName}.${RabbitMqConnection.RETRY_SUFFIX}`, queue))
        ]);
    }
    async setupDeadLetterQueue(exchangeName, queue, bindings) {
        // DL queue
        await this.channel.assertQueue(`${queue}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`, RabbitMqConnection.CREATE_QUEUE_COMMON_OPTIONS);
        await Promise.all([
            ...bindings.map(() => this.channel.bindQueue(`${queue}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`, `${exchangeName}.${RabbitMqConnection.DEAD_LETTER_SUFFIX}`, queue))
        ]);
    }
    async declareExchange(exchange) {
        await this.channel.assertExchange(exchange, 'topic', {
            durable: true,
            autoDelete: false
        });
    }
    async publishMessage(exchange, routingKey, messageId, data) {
        return new Promise((resolve, reject) => {
            this.channel.publish(exchange, routingKey, Buffer.from(data), { ...this.amqpChannelPublishOptions, messageId }, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async createConnection() {
        try {
            const connection = await amqplib.connect(this.amqpConnectionSettings);
            connection.on('error', err => console.error('Error en la conexión:', err));
            connection.on('close', () => console.warn('La conexión a RabbitMQ se cerró.'));
            return connection;
        }
        catch (err) {
            console.error('Error al crear la conexión:', err);
            throw err;
        }
    }
    async createChannel(connection) {
        try {
            const channel = await connection.createConfirmChannel();
            await channel.prefetch(1);
            channel.on('error', err => console.error('Error en el canal:', err));
            channel.on('close', () => console.warn('El canal se cerró.'));
            return channel;
        }
        catch (err) {
            console.error('Error al crear el canal:', err);
            throw err;
        }
    }
}
exports.default = RabbitMqConnection;
