import convict from 'convict';
import { configDotenv } from 'dotenv';
import path from 'path';

configDotenv({ path: path.join(__dirname, '..', '..', '..', '..', '..', '..', '.env') });

// Define a schema
const config = convict({
	env: {
		doc: 'The application environment.',
		format: ['production', 'dev', 'test'],
		env: 'NODE_ENV',
		default: process.env.NODE_ENV
	},
	typeorm: {
		host: {
			doc: 'The database host',
			format: String,
			env: 'TYPEORM_HOST',
			default: process.env.TYPEORM_HOST
		},
		port: {
			doc: 'The database port',
			format: Number,
			env: 'TYPEORM_PORT',
			default: process.env.TYPEORM_PORT
		},
		username: {
			doc: 'The database username',
			format: String,
			env: 'TYPEORM_USERNAME',
			default: process.env.TYPEORM_USERNAME
		},
		password: {
			doc: 'The database password',
			format: String,
			env: 'TYPEORM_PASSWORD',
			default: process.env.TYPEORM_PASSWORD
		},
		database: {
			doc: 'The database name',
			format: String,
			env: 'TYPEORM_DATABASE',
			default: process.env.TYPEORM_DATABASE
		}
	},
	rabbitmq: {
		connectionSettings: {
			protocol: {
				doc: 'RabbitMQ communication protocol',
				format: String,
				env: 'RABBITMQ_PROTOCOL',
				default: process.env.RABBITMQ_PROTOCOL
			},
			hostname: {
				doc: 'RabbitMQ hostname',
				format: String,
				env: 'RABBITMQ_HOSTNAME',
				default: process.env.RABBITMQ_HOSTNAME
			},
			port: {
				doc: 'RabbitMQ communication port',
				format: Number,
				env: 'RABBITMQ_PORT',
				default: process.env.RABBITMQ_PORT
			},
			username: {
				doc: 'RabbitMQ username',
				format: String,
				env: 'RABBITMQ_USERNAME',
				default: process.env.RABBITMQ_USERNAME
			},
			password: {
				doc: 'RabbitMQ password',
				format: String,
				env: 'RABBITMQ_PASSWORD',
				default: process.env.RABBITMQ_PASSWORD
			},
			vhost: {
				doc: 'RabbitMQ vhost',
				format: String,
				env: 'RABBITMQ_VHOST',
				default: process.env.RABBITMQ_VHOST
			}
		},
		publishOptions: {
			contentType: {
				doc: 'Content type for published messages',
				format: String,
				env: 'RABBITMQ_PUBLISH_CONTENT_TYPE',
				default: process.env.RABBITMQ_PUBLISH_CONTENT_TYPE
			},
			contentEncoding: {
				doc: 'Content encoding for published messages',
				format: String,
				env: 'RABBITMQ_PUBLISH_CONTENT_ENCODING',
				default: process.env.RABBITMQ_PUBLISH_CONTENT_ENCODING
			}
		}
	},
	spotify: {
		clientId: {
			doc: 'Spotify client ID',
			format: String,
			env: 'SPOTIFY_CLIENT_ID',
			default: process.env.SPOTIFY_CLIENT_ID
		},
		clientSecret: {
			doc: 'Spotify client secret',
			format: String,
			env: 'SPOTIFY_CLIENT_SECRET',
			default: process.env.SPOTIFY_CLIENT_SECRET
		},
		redirectUri: {
			doc: 'Spotify redirect URI',
			format: String,
			env: 'SPOTIFY_REDIRECT_URI',
			default: process.env.SPOTIFY_REDIRECT_URI
		},
		scope: {
			doc: 'Spotify scope',
			format: String,
			env: 'SPOTIFY_SCOPE',
			default: process.env.SPOTIFY_SCOPE
		},
		responseType: {
			doc: 'Spotify response type',
			format: String,
			env: 'SPOTIFY_RESPONSE_TYPE',
			default: process.env.SPOTIFY_RESPONSE_TYPE
		},
		grantType: {
			doc: 'Spotify grant type',
			format: String,
			env: 'SPOTIFY_GRANT_TYPE',
			default: process.env.SPOTIFY_GRANT_TYPE
		},
		userAuthorizationUri: {
			doc: 'Spotify user authorization URI',
			format: String,
			env: 'SPOTIFY_USER_AUTHORIZATION_URI',
			default: process.env.SPOTIFY_USER_AUTHORIZATION_URI
		},
		stateFile: {
			doc: 'Spotify state file',
			format: String,
			env: 'SPOTIFY_STATE_FILE',
			default: process.env.SPOTIFY_STATE_FILE
		}
	},
	system: {
		privateKey: {
			doc: 'Path to private key for JWT',
			format: String,
			env: 'SYSTEM_PRIVATE_KEY',
			default: process.env.SYSTEM_PRIVATE_KEY
		},
		publicKey: {
			doc: 'Path to public key for JWT',
			format: String,
			env: 'SYSTEM_PUBLIC_KEY',
			default: process.env.SYSTEM_PUBLIC_KEY
		}
	}
});

// Load environment-dependent configuration
const env = config.get('env') as string;

config.loadFile(path.join(__dirname, '/', `convict_${env}.json`));

export default config;
