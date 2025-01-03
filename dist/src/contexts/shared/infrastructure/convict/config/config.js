"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/*eslint-disable @typescript-eslint/no-unsafe-member-access*/
const convict_1 = __importDefault(require("convict"));
const path_1 = __importDefault(require("path"));
// // Define a schema
const config = (0, convict_1.default)({
    env: {
        doc: 'The application environment.',
        format: ['production', 'dev', 'test'],
        default: 'dev',
        env: 'NODE_ENV'
    },
    typeorm: {
        host: {
            doc: 'The database host',
            format: String,
            env: 'TYPEORM_HOST',
            default: 'localhost'
        },
        port: {
            doc: 'The database port',
            format: Number,
            env: 'TYPEORM_PORT',
            default: 5432
        },
        username: {
            doc: 'The database username',
            format: String,
            env: 'TYPEORM_USERNAME',
            default: 'admin'
        },
        password: {
            doc: 'The database password',
            format: String,
            env: 'TYPEORM_PASSWORD',
            default: 'p@ssw0rd'
        },
        database: {
            doc: 'The database name',
            format: String,
            env: 'TYPEORM_DATABASE',
            default: 'backoffice-backend-dev'
        }
    },
    rabbitmq: {
        connectionSettings: {
            protocol: {
                doc: 'RabbitMQ communictaion protocol',
                format: String,
                default: 'amqp'
            },
            hostname: {
                doc: 'RabbitMQ hostname',
                format: String,
                default: 'localhost'
            },
            port: {
                doc: 'RabbitMQ communication port',
                format: Number,
                default: 5672
            },
            username: {
                doc: 'RabbitMQ username',
                format: String,
                default: 'admin'
            },
            password: {
                doc: 'RabbitMQ password',
                format: String,
                default: 'p@ssw0rd'
            },
            vhost: {
                doc: 'RabbitMQ vhost',
                format: String,
                default: '/'
            }
        },
        publishOptions: {
            contentType: {
                doc: 'Content type for published messages',
                format: String,
                default: 'application/json'
            },
            contentEncoding: {
                doc: 'Content encoding for published messages',
                format: String,
                default: 'utf-8'
            }
        }
    }
});
// // Load environment dependent configuration
const env = config.get('env');
// config.loadFile(`./config/${env}.json`);
config.loadFile(path_1.default.join(__dirname, '/', `convict_${env}.json`));
exports.default = config;
