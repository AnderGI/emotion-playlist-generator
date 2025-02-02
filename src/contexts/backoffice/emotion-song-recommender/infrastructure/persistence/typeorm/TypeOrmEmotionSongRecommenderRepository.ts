import { DataSource, EntitySchema, Repository } from 'typeorm';

import { Nullable } from '../../../../../../shared/domain/Nullable';
import EmotionSongRecommender from '../../../domain/EmotionSongRecommender';
import { EmotionSongRecommenderRepository } from '../../../domain/EmotionSongRecommenderRepository';
import { EmotionSongRecommenderEntity } from './EmotionSongRecommender.entity';

export class TypeOrmEmotionSongRecommenderRepository implements EmotionSongRecommenderRepository {
	constructor(private readonly _client: Promise<DataSource>) {}

	public async save(emotionSongRecommender: EmotionSongRecommender): Promise<void> {
		return this.persist(emotionSongRecommender);
	}

	public async search(
		emotionSongRecommender: EmotionSongRecommender
	): Promise<Nullable<EmotionSongRecommender>> {
		const repository = await this.repository();

		const founded = await repository.findOne({
			where: {
				spotifyUserId: emotionSongRecommender.spotifyUserId
			}
		});

		return founded;
	}

	public entitySchema(): EntitySchema<EmotionSongRecommender> {
		return EmotionSongRecommenderEntity;
	}

	private async client(): Promise<DataSource> {
		return this._client;
	}

	private async repository(): Promise<Repository<EmotionSongRecommender>> {
		return (await this.client()).getRepository(this.entitySchema());
	}

	private async persist(aggregateRoot: EmotionSongRecommender): Promise<void> {
		const repository = await this.repository();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await repository.save(aggregateRoot);
	}
}
