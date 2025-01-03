"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmImageRepository = void 0;
const ImageEntity_entity_1 = require("./ImageEntity.entity");
class TypeOrmImageRepository {
    _client;
    constructor(_client) {
        this._client = _client;
    }
    async save(image) {
        return this.persist(image);
    }
    async search(id) {
        const repository = await this.repository();
        const image = await repository.findOne({
            where: {
                id
            }
        });
        return image;
    }
    entitySchema() {
        return ImageEntity_entity_1.ImageEntity;
    }
    async client() {
        return this._client;
    }
    async repository() {
        return (await this.client()).getRepository(this.entitySchema());
    }
    async persist(aggregateRoot) {
        const repository = await this.repository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await repository.save(aggregateRoot);
    }
}
exports.TypeOrmImageRepository = TypeOrmImageRepository;
