import { Image } from './Image';

export interface ImageRepository {
	save(image: Image): Promise<void>;
}
