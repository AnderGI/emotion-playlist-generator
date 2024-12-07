import container from '../../apps/backoffice/backend/dependency-injection';
import { DomainEvent } from '../../contexts/shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../contexts/shared/domain/event/DomainEventSubscriber';
import { AmqpWrapper } from '../../contexts/shared/infrastructure/event/AmqpWrapper';

const amqpWrapper = container.get<AmqpWrapper>('backoffice.shared.AmqpWrapper');

const subscribers = container.findTaggedServiceIds('subscriber');
const ids = [...subscribers.keys()];

const queuesToBindings = ids.map(id => {
	const subscriber = container.get<DomainEventSubscriber<DomainEvent>>(id as string);
	const queue = subscriber.queueName();
	const bindings = subscriber.subscribedTo().map(event => event.name);

	return { queue, bindings };
});

async function main() {
	await amqpWrapper.connect();
	// Create exchanges
	await amqpWrapper.declareExchanges('domain_events');
	// Create all queues
	await Promise.all(
		queuesToBindings.map(queueToBindings =>
			amqpWrapper.createQueues('domain_events', queueToBindings)
		)
	);
	// Close conecction
	await amqpWrapper.close();
}

main().catch(err => console.log(err));
