export type AmqpChannelPublishOptions = {
	contentType: string;
	contentEncoding: string;
};

export class AmqpChannelPublishOptionsFactory {
	static createOptions(): AmqpChannelPublishOptions {
		return {
			contentType: 'application/json',
			contentEncoding: 'utf-8'
		};
	}
}
