import { ImagePath } from '../../image/domain/ImagePath';

export interface ImageToEmotionGenerator {
	generate(path: ImagePath): Promise<void>;
}
