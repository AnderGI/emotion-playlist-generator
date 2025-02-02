import { DataSource, EntitySchema, Repository } from 'typeorm';

import { Nullable } from '../../../../../../shared/domain/Nullable';
import SpotifyUser from '../../../domain/SpotifyUser';
import { SpotifyUserRepository } from '../../../domain/SpotifyUserRepository';
import { SpotifyUserEntity } from './SpotifyUserEntity.entity';

export class TypeOrmSpotifyUserRepository implements SpotifyUserRepository {
	constructor(private readonly _client: Promise<DataSource>) {}

	public async save(user: SpotifyUser): Promise<void> {
		return this.persist(user);
	}

	public async search(user: SpotifyUser): Promise<Nullable<SpotifyUser>> {
		const repository = await this.repository();

		const retrievedUser = await repository.findOne({
			where: {
				spotifyId: user.spotifyId.getValue()
			}
		});

		return retrievedUser;
	}

	public entitySchema(): EntitySchema<SpotifyUser> {
		return SpotifyUserEntity;
	}

	private async client(): Promise<DataSource> {
		return this._client;
	}

	private async repository(): Promise<Repository<SpotifyUser>> {
		return (await this.client()).getRepository(this.entitySchema());
	}

	private async persist(aggregateRoot: SpotifyUser): Promise<void> {
		const repository = await this.repository();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await repository.save(aggregateRoot);
	}
}
