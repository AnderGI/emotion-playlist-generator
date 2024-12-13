import OllamaLLaVaImageToEmotionGenerator from '../../../../../src/contexts/backoffice/image-to-emotion/infrastructure/OllamaLLaVaImageToEmotionGenerator';
import { ImageFilenameMother } from '../../../image/domain/ImageFilenameMother';

describe('OllamaLLaVaImageToEmotionGenerator', () => {
	describe('#relate', () => {
		it('should generate only one emotion per image', async () => {
			const ollamaLLaVaImageToEmotionGenerator = new OllamaLLaVaImageToEmotionGenerator();

			const response = await ollamaLLaVaImageToEmotionGenerator.relate(
				ImageFilenameMother.create('artist-white.png')
			);

			// Validamos que el objeto tenga la propiedad 'emotion'
			expect(response).toHaveProperty('emotion');

			// Validamos que 'emotion' sea una cadena no vacía
			expect(typeof response.emotion).toBe('string');
			expect(response.emotion).not.toBe('');

			// Imprimimos la respuesta en caso de querer más información de depuración
			console.log('Generated emotion:', response.emotion);
		}, 240000);
	});
});
