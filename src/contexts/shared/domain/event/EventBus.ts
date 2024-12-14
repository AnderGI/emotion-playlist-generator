import { DomainEvent } from './DomainEvent';

export interface EventBus {
	publish(event: DomainEvent): Promise<void>;
}
