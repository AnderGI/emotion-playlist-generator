import { ContainerBuilder, Definition } from 'node-dependency-injection';

import { DomainEvent } from '../../domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../domain/event/DomainEventSubscriber';

export class DomainEventSubscribers {
	constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) {}

	static from(container: ContainerBuilder): DomainEventSubscribers {
		const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<
			string,
			Definition
		>;
		const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

		subscriberDefinitions.forEach((value: Definition, key: string) => {
			const domainEventSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(
				key.toString()
			);
			subscribers.push(domainEventSubscriber);
		});

		return new DomainEventSubscribers(subscribers);
	}
}
