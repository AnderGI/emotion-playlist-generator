import CreateImageUseCaseArrenger from './CreateImageUseCaseArrenger';

describe('ImageSaver', () => {
	describe('#run', () => {
		it('should save an image', async () => {
			await CreateImageUseCaseArrenger.create().executeHappyPath();
		});
	});
});
