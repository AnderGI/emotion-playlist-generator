import container from '../../apps/backoffice/backend/dependency-injection';
import { DomainEvent } from '../../contexts/shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../contexts/shared/domain/event/DomainEventSubscriber';
import RabbitMqConnection from '../../contexts/shared/infrastructure/event/RabbitMqConnection';

const EXCHANGE_NAME = 'domain_events';
const setupConfigurer: RabbitMqConnection = container.get('backoffice.shared.RabbitMqConnection');

const subscribers = container.findTaggedServiceIds('subscriber');
const ids = [...subscribers.keys()];

const queuesToBindings = ids.map(id => {
	const subscriber = container.get<DomainEventSubscriber<DomainEvent>>(id as string);
	const queue = subscriber.queueName();
	const bindings = subscriber.subscribedTo().map(event => event.EVENT_NAME);

	return { queue, bindings };
});

async function main() {
	await setupConfigurer.connect();
	await setupConfigurer.declareExchanges(EXCHANGE_NAME);
	// Create all queues
	await Promise.all(
		queuesToBindings.map(queueToBindings =>
			setupConfigurer.createQueues(EXCHANGE_NAME, queueToBindings)
		)
	);
	await setupConfigurer.close();
}

main().catch(err => console.error('error ', err));
