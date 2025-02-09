import { EntitySchema } from 'typeorm';

import EmotionSongRecommender from '../../../domain/EmotionSongRecommender';

export const EmotionSongRecommenderEntity = new EntitySchema<EmotionSongRecommender>({
	name: 'EmotionSongRecommender',
	tableName: 'emotion_song_recommender',
	target: EmotionSongRecommender,
	columns: {
		spotifyUserId: {
			type: String,
			primary: true
		},
		spotifyUserMail: {
			type: String,
			nullable: true
		},
		lastTracks: {
			type: 'json',
			nullable: true
		}
	}
});
