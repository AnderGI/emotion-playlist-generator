"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmClientFactory = void 0;
const typeorm_1 = require("typeorm");
const ImageEntity_entity_1 = require("../../../../backoffice/image/infrastructure/persistence/typeorm/ImageEntity.entity");
ImageEntity_entity_1.ImageEntity;
class TypeOrmClientFactory {
    static async createClient(contextName, config) {
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
    }
}
exports.TypeOrmClientFactory = TypeOrmClientFactory;
