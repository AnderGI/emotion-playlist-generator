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

	public async arrange(): Promise<void> {
		await this.cleanDatabase();
	}

	private async cleanDatabase(): Promise<void> {
		const entities = await this.entities();
		const client = await this.client();
		const repositories = entities.map(entity => ({
			repository: client.getRepository(entity.name),
			tableName: entity.tableName
		}));

		await Promise.all(
			repositories.map(async ({ repository, tableName }) => {
				await repository.query(`TRUNCATE TABLE ${tableName};`);
			})
		).catch(error => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			throw new Error(`Unable to clean test database: ${error}`);
		});
	}

	private async entities(): Promise<EntityMetadata[]> {
		return (await this.client()).entityMetadatas;
	}

	private async client(): Promise<DataSource> {
		return this._client;
	}
}