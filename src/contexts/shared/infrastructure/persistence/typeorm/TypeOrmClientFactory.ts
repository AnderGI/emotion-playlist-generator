import { DataSource } from 'typeorm';

import { ImageEntity } from '../../../../backoffice/image/infrastructure/persistence/typeorm/ImageEntity';
import { TypeOrmConfig } from './TypeOrmConfig';

ImageEntity;

export class TypeOrmClientFactory {
	static async createClient(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
		const connection = new DataSource({
			name: contextName,
			type: 'postgres',
			host: config.host,
			port: config.port,
			username: config.username,
			password: config.password,
			database: config.database,
			entities: [
				`${__dirname}/../../../../backoffice/image/infrastructure/persistence/typeorm/*.ts`
			],
			synchronize: true,
			logging: true
		});
		try {
			return connection.initialize();
		} catch (error) {
			console.log(`Error in TypeOrm factory`);
			process.exit(1);
		}
	}
}
