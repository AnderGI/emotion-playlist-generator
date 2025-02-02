"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmEnvironmentArranger = void 0;
class TypeOrmEnvironmentArranger {
    constructor(_client) {
        this._client = _client;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client()).destroy();
        });
    }
    clean() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cleanDatabase();
        });
    }
    // public async arrange(): Promise<void> {
    // 	await this.cleanDatabase();
    // }
    cleanDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.entities();
            const client = yield this.client();
            yield client.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                yield Promise.all(entities.map(entity => transactionalEntityManager.query(`DELETE FROM "${entity.tableName}";`)));
            }));
        });
    }
    entities() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client()).entityMetadatas;
        });
    }
    client() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._client;
        });
    }
}
exports.TypeOrmEnvironmentArranger = TypeOrmEnvironmentArranger;
