import { EntitySchema } from 'typeorm';

import SpotifyUserLastTracks from '../../../domain/SpotifyUserLastTracks';

export const SpotifyUserLastTracksEntity = new EntitySchema<SpotifyUserLastTracks>({
	name: 'SpotifyUserLastTracks',
	tableName: 'spotify_users_last_tracks',
	target: SpotifyUserLastTracks,
	columns: {
		userId: {
			type: String,
			primary: true
		},
		topTracks: {
			type: 'json'
		},
		updatedAt: {
			type: 'bigint'
		}
	}
});
