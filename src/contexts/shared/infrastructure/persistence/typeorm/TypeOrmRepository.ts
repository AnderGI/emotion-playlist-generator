import { DataSource, EntitySchema, Repository } from 'typeorm';

import { AggregateRoot } from '../../../domain/AggregateRoot';

export abstract class TypeOrmRepository<T extends AggregateRoot> {
	constructor(private readonly _client: Promise<DataSource>) {}

	protected abstract entitySchema(): EntitySchema<T>;

	protected async client(): Promise<DataSource> {
		return this._client;
	}

	protected async repository(): Promise<Repository<T>> {
		return (await this._client).getRepository(this.entitySchema());
	}

	protected async persist(aggregateRoot: T): Promise<void> {
		const repository = await this.repository();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await repository.save(aggregateRoot as any);
	}
}
