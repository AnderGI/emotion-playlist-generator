import { EntitySchema } from 'typeorm';

import SpotifyUser from '../../../domain/SpotifyUser';

export const ImageEntity = new EntitySchema<SpotifyUser>({
	name: 'SpotifyUser',
	tableName: 'spotify_users',
	target: SpotifyUser,
	columns: {
		id: {
			type: String,
			primary: true
		},
		country: {
			type: String
		},
		displayName: {
			type: String
		},
		email: {
			type: String
		}
	}
});
