import EmotionSongRecommender from './EmotionSongRecommender';

export interface EmotionSongRecommenderRepository {
	save(emotionSongRecommenderRepository: EmotionSongRecommender): Promise<void>;
}
