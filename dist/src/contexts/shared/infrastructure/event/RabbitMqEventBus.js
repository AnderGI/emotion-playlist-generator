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
exports.RabbitMqEventBus = void 0;
class RabbitMqEventBus {
    constructor(rabbitmqConnection, domainEventsFallback, domainEventJsonSerializer) {
        this.rabbitmqConnection = rabbitmqConnection;
        this.domainEventsFallback = domainEventsFallback;
        this.domainEventJsonSerializer = domainEventJsonSerializer;
    }
    publish(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.rabbitmqConnection.publish({
                    routingKey: event.eventName,
                    messageId: event.eventId,
                    data: this.serialize(event)
                });
            }
            catch (err) {
                console.log(err);
                yield this.domainEventsFallback.fallback(event);
            }
        });
    }
    serialize(event) {
        return this.domainEventJsonSerializer.serialize(event);
    }
}
exports.RabbitMqEventBus = RabbitMqEventBus;
