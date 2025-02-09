import { Nullable } from '../../../../shared/domain/Nullable';
import EmotionSongRecommender from './EmotionSongRecommender';

export interface EmotionSongRecommenderRepository {
	save(emotionSongRecommenderRepository: EmotionSongRecommender): Promise<void>;
	search(aggregate: EmotionSongRecommender): Promise<Nullable<EmotionSongRecommender>>;
}
