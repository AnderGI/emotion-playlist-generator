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
exports.DomainEventsFallback = void 0;
const DomainEventEntity_entity_1 = require("./DomainEventEntity.entity");
class DomainEventsFallback {
    constructor(_client) {
        this._client = _client;
    }
    fallback(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.persist(event);
        });
    }
    entitySchema() {
        return DomainEventEntity_entity_1.DomainEventEntity;
    }
    client() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._client;
        });
    }
    repository() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client()).getRepository(this.entitySchema());
        });
    }
    persist(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.repository();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            yield repository.save({
                id: event.eventId, // UUID del evento
                body: {
                    aggregateId: event.aggregateId,
                    eventId: event.eventId,
                    occurredOn: event.occurredOn,
                    eventName: event.eventName,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    attributes: event.toPrimitives() // Representación JSON de los atributos del evento
                }
            });
        });
    }
}
exports.DomainEventsFallback = DomainEventsFallback;
