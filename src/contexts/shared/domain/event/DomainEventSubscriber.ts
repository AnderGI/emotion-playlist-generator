import { DomainEvent, DomainEventClassName } from './DomainEvent';

export interface DomainEventSubscriber<T extends DomainEvent> {
	subscribedTo(): Array<DomainEventClassName>;
	on(domainEvent: T): Promise<void>;
	queueName(): string;
}
