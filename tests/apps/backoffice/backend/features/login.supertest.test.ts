import request from 'supertest';

import BackofficeBackendApp from '../../../../../src/apps/backoffice/backend/BackofficeBackendApp';

describe('Login Feature. Authentication', () => {
	describe('Valid user authentication flow', () => {
		it('should replace any user to auth', async () => {
			const application = new BackofficeBackendApp();
			await application.start();
			console.log('starting');
			await request(application).get('/').expect(200);
			await application.stop();
			console.log('ending');
		});
	});
});
