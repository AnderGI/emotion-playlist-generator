import { DataSource, EntitySchema, Repository } from 'typeorm';

import { Nullable } from '../../../../../../shared/domain/Nullable';
import SpotifyUserLastTracks from '../../../domain/SpotifyUserLastTracks';
import SpotifyUserLastTracksRepository from '../../../domain/SpotifyUserLastTracksRepository';
import { SpotifyUserLastTracksEntity } from './SpotifyUserLastTracksEntity.entity';

export class TypeOrmSpotifyUserLastTracksRepository implements SpotifyUserLastTracksRepository {
	constructor(private readonly _client: Promise<DataSource>) {}

	public async save(user: SpotifyUserLastTracks): Promise<void> {
		return this.persist(user);
	}

	public async search(aggregateId: string): Promise<Nullable<SpotifyUserLastTracks>> {
		const repository = await this.repository();
		const user = await repository.findOne({
			where: {
				userId: aggregateId
			}
		});

		return user;
	}

	public entitySchema(): EntitySchema<SpotifyUserLastTracks> {
		return SpotifyUserLastTracksEntity;
	}

	private async client(): Promise<DataSource> {
		return this._client;
	}

	private async repository(): Promise<Repository<SpotifyUserLastTracks>> {
		return (await this.client()).getRepository(this.entitySchema());
	}

	private async persist(aggregateRoot: SpotifyUserLastTracks): Promise<void> {
		const repository = await this.repository();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await repository.save(aggregateRoot);
	}
}
