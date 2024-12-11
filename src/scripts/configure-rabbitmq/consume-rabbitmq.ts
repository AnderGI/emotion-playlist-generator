import container from '../../apps/backoffice/backend/dependency-injection';
import { DomainEvent } from '../../contexts/shared/domain/event/DomainEvent';
import { DomainEventSubscriber } from '../../contexts/shared/domain/event/DomainEventSubscriber';
import RabbitMqConnection from '../../contexts/shared/infrastructure/event/RabbitMqConnection';

const consumeConfigurer: RabbitMqConnection = container.get('backoffice.shared.RabbitMqConnection');

const subscribersIds = [...container.findTaggedServiceIds('subscriber').keys()];

const queuesToSubscriber = subscribersIds.map(id => {
	const subscriber = container.get<DomainEventSubscriber<DomainEvent>>(id as string);
	const queue = subscriber.queueName();

	return { queue, subscriber };
});

async function main() {
	await consumeConfigurer.connect();
	await consumeConfigurer.consume(queuesToSubscriber);
}

main().catch(err => console.log(err));
