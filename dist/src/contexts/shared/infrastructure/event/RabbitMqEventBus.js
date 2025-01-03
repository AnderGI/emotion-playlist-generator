"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqEventBus = void 0;
class RabbitMqEventBus {
    rabbitmqConnection;
    domainEventsFallback;
    domainEventJsonSerializer;
    constructor(rabbitmqConnection, domainEventsFallback, domainEventJsonSerializer) {
        this.rabbitmqConnection = rabbitmqConnection;
        this.domainEventsFallback = domainEventsFallback;
        this.domainEventJsonSerializer = domainEventJsonSerializer;
    }
    async publish(event) {
        try {
            await this.rabbitmqConnection.publish({
                routingKey: event.eventName,
                messageId: event.eventId,
                data: this.serialize(event)
            });
        }
        catch (err) {
            console.log(err);
            await this.domainEventsFallback.fallback(event);
        }
    }
    addSubscribers(subscribers) {
        throw new Error('Method not implemented.');
    }
    serialize(event) {
        return this.domainEventJsonSerializer.serialize(event);
    }
}
exports.RabbitMqEventBus = RabbitMqEventBus;
