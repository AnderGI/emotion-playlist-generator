import { DomainEventSubscribers } from '../../../infrastructure/bus/event/DomainEventSubscribers';
import { DomainEvent } from './DomainEvent';

export interface EventBus {
	publish(event: DomainEvent): Promise<void>;
	addSubscribers(subscribers: DomainEventSubscribers): void;
}
