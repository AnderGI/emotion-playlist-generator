import { DomainEvent } from '../../domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../domain/event/DomainEventSubscriber';
import { EventBus } from '../../domain/event/EventBus';
import { DomainEventSubscribers } from './DomainEventSubscribers';

export class InMemorySyncEventBus
	extends Map<string, DomainEventSubscriber<DomainEvent>[]>
	implements EventBus
{
	async publish(event: DomainEvent): Promise<void> {
		// const subscribers = this.get(event.eventName);
		// if (!subscribers) {
		// 	throw new Error(`No subscribers found for ${event.eventName}`);
		// }

		// await Promise.all(subscribers.map(subscriber => subscriber.on(event)));
		console.log(event);
		await Promise.resolve();
	}

	addSubscribers(subscribers: DomainEventSubscribers): void {
		subscribers.items.forEach(subscriber => {
			const events = subscriber.subscribedTo();
			events.forEach(event => {
				const eventName = event.EVENT_NAME;
				if (!this.get(eventName)) {
					this.set(eventName, []);
				}
				this.get(eventName)?.push(subscriber);
			});
		});
	}
}
