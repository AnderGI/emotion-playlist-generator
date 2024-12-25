import RelateImageToEmotionUseCaseArrenger from './RelateImageToEmotionUseCaseArrenger';

describe('ImageToEmotionRelator', () => {
	describe('#relate', () => {
		it('should search for valid emotions from image', async () => {
			await RelateImageToEmotionUseCaseArrenger.create().executeHappyPath();
		});
	});
});
