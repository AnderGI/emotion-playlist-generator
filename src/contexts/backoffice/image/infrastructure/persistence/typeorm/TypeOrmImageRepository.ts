import { DataSource, EntitySchema, Repository } from 'typeorm';

import { Nullable } from '../../../../../../shared/domain/Nullable';
import { Image } from '../../../domain/Image';
import { ImageId } from '../../../domain/ImageId';
import { ImageRepository } from '../../../domain/ImageRepository';
import { ImageEntity } from './ImageEntity.entity';

export class TypeOrmImageRepository implements ImageRepository {
	constructor(private readonly _client: Promise<DataSource>) {}

	public async save(image: Image): Promise<void> {
		return this.persist(image);
	}

	public async search(id: ImageId): Promise<Nullable<Image>> {
		const repository = await this.repository();

		const image = await repository.findOne({
			where: {
				id
			}
		});

		return image;
	}

	public entitySchema(): EntitySchema<Image> {
		return ImageEntity;
	}

	private async client(): Promise<DataSource> {
		return this._client;
	}

	private async repository(): Promise<Repository<Image>> {
		return (await this.client()).getRepository(this.entitySchema());
	}

	private async persist(aggregateRoot: Image): Promise<void> {
		const repository = await this.repository();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await repository.save(aggregateRoot);
	}
}
