import { ImageFilename } from '../../image/domain/ImageFilename';

export type GeneratorResult = {
	emotion: string;
};
export default interface ImageToEmotionRelator {
	relate(path: ImageFilename): Promise<GeneratorResult>;
}
