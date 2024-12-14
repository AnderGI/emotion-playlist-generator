import ImageToEmotion from './ImageToEmotion';

export type GeneratorResult = {
	emotion: string;
};
export default interface ImageToEmotionRelator {
	relate(imageToEmotion: ImageToEmotion): Promise<GeneratorResult>;
}
