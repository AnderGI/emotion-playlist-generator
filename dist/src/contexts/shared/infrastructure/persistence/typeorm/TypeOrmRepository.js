"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmRepository = void 0;
class TypeOrmRepository {
    _client;
    constructor(_client) {
        this._client = _client;
    }
    async client() {
        return this._client;
    }
    async repository() {
        return (await this._client).getRepository(this.entitySchema());
    }
    async persist(aggregateRoot) {
        const repository = await this.repository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await repository.save(aggregateRoot);
    }
}
exports.TypeOrmRepository = TypeOrmRepository;
