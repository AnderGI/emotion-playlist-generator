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
exports.TypeOrmImageRepository = void 0;
const ImageEntity_entity_1 = require("./ImageEntity.entity");
class TypeOrmImageRepository {
    constructor(_client) {
        this._client = _client;
    }
    save(image) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.persist(image);
        });
    }
    search(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.repository();
            const image = yield repository.findOne({
                where: {
                    id
                }
            });
            return image;
        });
    }
    entitySchema() {
        return ImageEntity_entity_1.ImageEntity;
    }
    client() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._client;
        });
    }
    repository() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client()).getRepository(this.entitySchema());
        });
    }
    persist(aggregateRoot) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.repository();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            yield repository.save(aggregateRoot);
        });
    }
}
exports.TypeOrmImageRepository = TypeOrmImageRepository;
