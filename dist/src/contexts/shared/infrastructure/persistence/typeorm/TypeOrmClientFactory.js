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
exports.TypeOrmClientFactory = void 0;
const typeorm_1 = require("typeorm");
const ImageEntity_entity_1 = require("../../../../backoffice/image/infrastructure/persistence/typeorm/ImageEntity.entity");
ImageEntity_entity_1.ImageEntity;
class TypeOrmClientFactory {
    static createClient(contextName, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = new typeorm_1.DataSource({
                name: contextName,
                type: 'postgres',
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password,
                database: config.database,
                entities: [`${__dirname}/../../../../**/*.entity.ts`],
                synchronize: true,
                logging: true
            });
            try {
                return connection.initialize();
            }
            catch (error) {
                console.log(`Error in TypeOrm factory`);
                process.exit(1);
            }
        });
    }
}
exports.TypeOrmClientFactory = TypeOrmClientFactory;
