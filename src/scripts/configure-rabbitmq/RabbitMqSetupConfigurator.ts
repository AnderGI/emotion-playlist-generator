import * as amqplib from 'amqplib';

// type QueueToBindings = {
// 	queue: string;
// 	bindings: string[];
// };

/**
 * Configurator for RabbitMQ exchanges, queues, and bindings.
 */
export class RabbitMqSetupConfigurator {
	private readonly channel?: amqplib.ConfirmChannel;
	private readonly retrySuffix = 'retry';
	private readonly deadLetterSuffix = 'dead_letter';

	async declareExchanges(exchange: string): Promise<void> {
		await Promise.all([
			this.declareExchange(exchange),
			this.declareExchange(`${exchange}.${this.retrySuffix}`),
			this.declareExchange(`${exchange}.${this.deadLetterSuffix}`)
		]);
	}

	async createQueues(
		exchangeName: string,
		queueToBindings: { queue: string; bindings: string[] }
	): Promise<void> {
		const { queue, bindings } = queueToBindings;
		await Promise.all([
			this.setupBaseQueue(exchangeName, queue, bindings),
			this.setupRetryQueue(exchangeName, queue, bindings),
			this.setupDeadLetterQueue(exchangeName, queue, bindings)
		]);
	}

	private async setupBaseQueue(exchangeName: string, queue: string, bindings: string[]) {
		// Base queue
		await this.channel?.assertQueue(queue, {
			durable: true,
			autoDelete: false,
			exclusive: false
		});
		await Promise.all([
			...bindings.map(binding => this.channel?.bindQueue(queue, exchangeName, binding)),
			this.channel?.bindQueue(queue, exchangeName, queue)
		]);
	}

	private async setupRetryQueue(exchangeName: string, queue: string, bindings: string[]) {
		// Retry queue
		await this.channel?.assertQueue(`${queue}.${this.retrySuffix}`, {
			durable: true,
			autoDelete: false,
			exclusive: false,
			messageTtl: 5000,
			deadLetterExchange: exchangeName,
			deadLetterRoutingKey: queue
		});
		await Promise.all([
			...bindings.map(binding =>
				this.channel?.bindQueue(
					`${queue}.${this.retrySuffix}`,
					`${exchangeName}.${this.retrySuffix}`,
					binding
				)
			)
		]);
	}

	private async setupDeadLetterQueue(exchangeName: string, queue: string, bindings: string[]) {
		// DL queue
		await this.channel?.assertQueue(`${queue}.${this.deadLetterSuffix}`, {
			durable: true,
			autoDelete: false,
			exclusive: false
		});
		await Promise.all([
			...bindings.map(binding =>
				this.channel?.bindQueue(
					`${queue}.${this.deadLetterSuffix}`,
					`${exchangeName}.${this.deadLetterSuffix}`,
					binding
				)
			)
		]);
	}

	/**
	 *
	 * @param exchange Name of the exchange to which domain events will be published
	 * Base, Retry and Dead Letter exchange will be created
	 */
	private async declareExchange(exchange: string): Promise<void> {
		await this.channel?.assertExchange(exchange, 'topic', {
			durable: true,
			autoDelete: false
		});
	}
}
