"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventEntity = void 0;
const typeorm_1 = require("typeorm");
exports.DomainEventEntity = new typeorm_1.EntitySchema({
    name: 'DomainEvent',
    tableName: 'fallback_domain_events',
    columns: {
        id: {
            type: 'uuid',
            primary: true // El ID del evento será la clave primaria
        },
        body: {
            type: 'jsonb' // Almacena la representación completa del evento como JSON
        }
    }
});
