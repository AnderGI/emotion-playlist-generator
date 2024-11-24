import config from '../../convict/config/config';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmConfigFactory {
	static createConfig(): TypeOrmConfig {
		return {
			host: config.get('typeorm.host'),
			port: config.get('typeorm.port'),
			username: config.get('typeorm.username'),
			password: config.get('typeorm.password'),
			database: config.get('typeorm.database')
		};
	}
}
