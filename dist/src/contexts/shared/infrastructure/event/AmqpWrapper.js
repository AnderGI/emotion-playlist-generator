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
exports.AmqpWrapper = void 0;
const amqplib = __importStar(require("amqplib"));
class AmqpWrapper {
    amqpConnectionSettings;
    amqpChannelPublishOptions;
    connection;
    channel;
    retrySuffix = 'retry';
    deadLetterSuffix = 'dead_letter';
    constructor(amqpConnectionSettings, amqpChannelPublishOptions) {
        this.amqpConnectionSettings = amqpConnectionSettings;
        this.amqpChannelPublishOptions = amqpChannelPublishOptions;
    }
    async connect() {
        if (this.connection && this.channel) {
            return;
        }
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
    /**
     * Publica un mensaje en un exchange de RabbitMQ.
     * Lanza un error si no hay un canal activo.
     *
     * @param params Objeto con exchange, routingKey, messageId y datos del mensaje.
     */
    async publish(params) {
        await this.connect();
        this.ensureChannelAvailable();
        const { exchange, routingKey, messageId, data } = params;
        try {
            await this.publishMessage(exchange, routingKey, messageId, data);
        }
        catch (err) {
            console.error('Error al publicar el mensaje:', err);
            throw err;
        }
    }
    /**
     * Cierra la conexión y el canal, liberando recursos.
     */
    async close() {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await this.connection.close();
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
    }
    async declareExchanges(exchange) {
        await Promise.all([
            this.declareExchange(exchange),
            this.declareExchange(`${exchange}.${this.retrySuffix}`),
            this.declareExchange(`${exchange}.${this.deadLetterSuffix}`)
        ]);
    }
    async createQueues(exchangeName, queueToBindings) {
        const { queue, bindings } = queueToBindings;
        await Promise.all([
            this.setupBaseQueue(exchangeName, queue, bindings),
            this.setupRetryQueue(exchangeName, queue, bindings),
            this.setupDeadLetterQueue(exchangeName, queue, bindings)
        ]);
    }
    async setupBaseQueue(exchangeName, queue, bindings) {
        // Base queue
        await this.channel?.assertQueue(queue, {
            durable: true,
            autoDelete: false,
            exclusive: false
        });
        await Promise.all([
            ...bindings.map(binding => this.channel?.bindQueue(queue, exchangeName, binding)),
            this.channel?.bindQueue(queue, exchangeName, queue)
        ]);
    }
    async setupRetryQueue(exchangeName, queue, bindings) {
        // Retry queue
        await this.channel?.assertQueue(`${queue}.${this.retrySuffix}`, {
            durable: true,
            autoDelete: false,
            exclusive: false,
            messageTtl: 5000,
            deadLetterExchange: exchangeName,
            deadLetterRoutingKey: queue
        });
        console.log(queue);
        await Promise.all([
            ...bindings.map(() => this.channel?.bindQueue(`${queue}.${this.retrySuffix}`, `${exchangeName}.${this.retrySuffix}`, queue))
        ]);
    }
    async setupDeadLetterQueue(exchangeName, queue, bindings) {
        // DL queue
        await this.channel?.assertQueue(`${queue}.${this.deadLetterSuffix}`, {
            durable: true,
            autoDelete: false,
            exclusive: false
        });
        await Promise.all([
            ...bindings.map(() => this.channel?.bindQueue(`${queue}.${this.deadLetterSuffix}`, `${exchangeName}.${this.deadLetterSuffix}`, queue))
        ]);
    }
    async declareExchange(exchange) {
        await this.channel?.assertExchange(exchange, 'topic', {
            durable: true,
            autoDelete: false
        });
    }
    ensureChannelAvailable() {
        if (!this.channel) {
            throw new Error('El canal no está disponible. Asegúrate de llamar a connect() antes de publicar.');
        }
    }
    async publishMessage(exchange, routingKey, messageId, data) {
        return new Promise((resolve, reject) => {
            this.channel?.publish(exchange, routingKey, Buffer.from(data), { ...this.amqpChannelPublishOptions, messageId }, err => {
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
exports.AmqpWrapper = AmqpWrapper;
