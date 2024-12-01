import { EntitySchema } from 'typeorm';

export const DomainEventEntity = new EntitySchema({
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
