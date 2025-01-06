import config from '../convict/config/config';

export type AmqpChannelPublishOptions = {
	contentType: string;
	contentEncoding: string;
};

export class AmqpChannelPublishOptionsFactory {
	static createOptions(): AmqpChannelPublishOptions {
		return {
			contentType: config.get('rabbitmq.publishOptions.contentType') as string,
			contentEncoding: config.get('rabbitmq.publishOptions.contentEncoding') as string
		};
	}
}
