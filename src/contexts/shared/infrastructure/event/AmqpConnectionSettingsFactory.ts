import config from '../convict/config/config';

export type AmqpConnectionSettings = {
	protocol: string;
	hostname: string;
	port: number;
	username: string;
	password: string;
	vhost: string;
};

export class AmqpConnectionSettingsFactory {
	static createConnection(): AmqpConnectionSettings {
		return {
			protocol: config.get('rabbitmq.connectionSettings.protocol') as string,
			hostname: config.get('rabbitmq.connectionSettings.hostname') as string,
			port: config.get('rabbitmq.connectionSettings.port') as unknown as number,
			username: config.get('rabbitmq.connectionSettings.username') as string,
			password: config.get('rabbitmq.connectionSettings.password') as string,
			vhost: config.get('rabbitmq.connectionSettings.vhost') as string
		};
	}
}
