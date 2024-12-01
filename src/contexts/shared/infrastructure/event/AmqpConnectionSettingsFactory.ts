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
			protocol: config.get('rabbitmq.connectionSettings.protocol'),
			hostname: config.get('rabbitmq.connectionSettings.hostname'),
			port: config.get('rabbitmq.connectionSettings.port'),
			username: config.get('rabbitmq.connectionSettings.username'),
			password: config.get('rabbitmq.connectionSettings.password'),
			vhost: config.get('rabbitmq.connectionSettings.vhost')
		};
	}
}
