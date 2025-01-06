import config from '../../convict/config/config';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmConfigFactory {
	static createConfig(): TypeOrmConfig {
		return {
			host: config.get('typeorm.host') as string,
			port: config.get('typeorm.port') as unknown as number,
			username: config.get('typeorm.username') as string,
			password: config.get('typeorm.password') as string,
			database: config.get('typeorm.database') as string
		};
	}
}
