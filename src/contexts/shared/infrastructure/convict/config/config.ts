/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/*eslint-disable @typescript-eslint/no-unsafe-member-access*/
import convict from 'convict';
import path from 'path';

// // Define a schema
const config = convict({
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
	}
});

// // Load environment dependent configuration
const env = config.get('env');
// config.loadFile(`./config/${env}.json`);
config.loadFile(path.join(__dirname, '/', `convict_${env}.json`));

export default config;
