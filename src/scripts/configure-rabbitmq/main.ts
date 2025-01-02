// import * as amqplib from 'amqplib';

import container from '../../apps/backoffice/backend/dependency-injection';

// import container from '../../apps/backoffice/backend/dependency-injection';
// import { DomainEvent } from '../../contexts/shared/domain/event/DomainEvent';
// import { DomainEventSubscriber } from '../../contexts/shared/domain/event/DomainEventSubscriber';

// // Exchanges
// const exchangeNames = ['domain_events'];

// // Configuración de conexión a RabbitMQ
// const connectionSettings = {
// 	protocol: 'amqp',
// 	hostname: 'localhost',
// 	port: parseInt(process.env.RABBITMQ_PORT || '5672'),
// 	username: process.env.RABBITMQ_USER || 'admin',
// 	password: process.env.RABBITMQ_PASS || 'p@ssw0rd',
// 	vhost: process.env.RABBITMQ_VHOST || '/'
// };

// // Obtén los bindings a partir de los suscriptores
// function getQueuesAndBindings() {
// 	const subscribers = container.findTaggedServiceIds('subscriber');
// 	const ids = [...subscribers.keys()];

// 	return ids.map(id => {
// 		const subscriber = container.get<DomainEventSubscriber<DomainEvent>>(id as string);
// 		const queue = subscriber.queueName();
// 		const bindings = subscriber.subscribedTo().map(event => event.name);

// 		return { queue, bindings };
// 	});
// }

// // Crea los exchanges
// async function createExchanges(channel: amqplib.Channel, exchanges: string[]) {
// 	await Promise.all(
// 		exchanges.map(name =>
// 			channel.assertExchange(name, 'topic', {
// 				autoDelete: false,
// 				durable: true
// 			})
// 		)
// 	);
// }

// async function createQueues(channel: amqplib.Channel, queues: string[]) {
// 	await Promise.all(
// 		queues.map(queue =>
// 			channel.assertQueue(queue, {
// 				exclusive: false,
// 				durable: true,
// 				autoDelete: false
// 			})
// 		)
// 	);
// }

// async function bindQueues(
// 	channel: amqplib.Channel,
// 	exchangeNames: string[],
// 	queuesToBindingsConfig: { queue: string; bindings: string[] }[]
// ) {
// 	await Promise.all(
// 		queuesToBindingsConfig.flatMap(config =>
// 			config.bindings.map(binding =>
// 				Promise.all(
// 					exchangeNames.map(exchange => channel.bindQueue(config.queue, exchange, binding))
// 				)
// 			)
// 		)
// 	);
// }

// // Función principal
// async function main() {
// 	try {
// 		console.log('Estableciendo conexión con RabbitMQ...');
// 		const connection = await amqplib.connect(connectionSettings);
// 		console.log('Conexión establecida.');

// 		const channel = await connection.createChannel();
// 		console.log('Canal creado.');

// 		console.log('Configurando exchanges, colas y bindings...');
// 		const queuesToBindingsConfig = getQueuesAndBindings();
// 		const queues = queuesToBindingsConfig.map(config => config.queue);

// 		await createExchanges(channel, exchangeNames);
// 		await createQueues(channel, queues);
// 		await bindQueues(channel, exchangeNames, queuesToBindingsConfig);

// 		console.log('RabbitMQ configurado correctamente.');

// 		await channel.close();
// 		await connection.close();
// 		console.log('Conexión cerrada.');
// 	} catch (error) {
// 		console.error('Error detectado:', error);
// 	}
// }

// main().catch(err => console.log(err));

console.log(container.get('scripts.RabbitMpSetupConfigurator'));
