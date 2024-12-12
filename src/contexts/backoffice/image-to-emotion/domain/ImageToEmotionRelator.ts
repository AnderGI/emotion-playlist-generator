import { ImagePath } from '../../image/domain/ImagePath';

export type GeneratorResult = {
	emotion: string;
};
export default interface ImageToEmotionRelator {
	relate(path: ImagePath): Promise<GeneratorResult>;
}
