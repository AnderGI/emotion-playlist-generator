import ImageToEmotion from '../../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotion';
import { GeneratorResult } from '../../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotionRelator';
import OllamaLLaVaImageToEmotionGenerator from '../../../../../src/contexts/backoffice/image-to-emotion/infrastructure/OllamaLLaVaImageToEmotionGenerator';
import { ImageFilenameMother } from '../../../image/domain/ImageFilenameMother';

describe('OllamaLLaVaImageToEmotionGenerator', () => {
	describe('#relate', () => {
		const ollamaLLaVaImageToEmotionGenerator = new OllamaLLaVaImageToEmotionGenerator();
		let response: GeneratorResult;

		beforeAll(async () => {
			response = await ollamaLLaVaImageToEmotionGenerator.relate(
				new ImageToEmotion(ImageFilenameMother.create('artist-white.png'))
			);
		}, 600000);

		it('should generate only one emotion per image', () => {
			// Validamos que el objeto tenga la propiedad 'emotion'
			expect(response).toHaveProperty('emotion');

			// Validamos que 'emotion' sea una cadena no vacía
			expect(typeof response.emotion).toBe('string');
			expect(response.emotion).not.toBe('');

			// Imprimimos la respuesta en caso de querer más información de depuración
			console.log('Generated emotion:', response.emotion);
		});
	});
});
