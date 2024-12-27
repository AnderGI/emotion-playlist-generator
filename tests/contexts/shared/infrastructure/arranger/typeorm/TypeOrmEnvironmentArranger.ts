import { DataSource, EntityMetadata } from 'typeorm';

import { EnvironmentArranger } from '../EnvironmentArranger';

export class TypeOrmEnvironmentArranger implements EnvironmentArranger {
	constructor(private readonly _client: Promise<DataSource>) {}

	async close(): Promise<void> {
		return (await this.client()).destroy();
	}

	async clean(): Promise<void> {
		await this.cleanDatabase();
	}

	// public async arrange(): Promise<void> {
	// 	await this.cleanDatabase();
	// }

	private async cleanDatabase(): Promise<void> {
		const entities = await this.entities();
		const client = await this.client();

		await client.transaction(async transactionalEntityManager => {
			await Promise.all(
				entities.map(entity =>
					transactionalEntityManager.query(`DELETE FROM "${entity.tableName}";`)
				)
			);
		});
	}

	private async entities(): Promise<EntityMetadata[]> {
		return (await this.client()).entityMetadatas;
	}

	private async client(): Promise<DataSource> {
		return this._client;
	}
}
