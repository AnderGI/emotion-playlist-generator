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
			protocol: 'amqp',
			hostname: 'localhost',
			port: 5672,
			username: 'admin',
			password: 'p@ssw0rd',
			vhost: '/'
		};
	}
}
