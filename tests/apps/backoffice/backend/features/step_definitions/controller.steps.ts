import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';

import BackofficeBackendApp from '../../../../../../src/apps/backoffice/backend/BackofficeBackendApp';

// let _request: request.Test;
let application: BackofficeBackendApp;
let _response: request.Response;

BeforeAll(async () => {
	application = new BackofficeBackendApp();
	await application.start();
	console.log('iniciado');
});

AfterAll(async () => {
	await application.stop();
});

Given('I send a GET request to {string}', async (route: string) => {
	_response = await request(application.httpServer).get(route);
});

Given(
	'I send a POST request to {string} with JSON request body:',
	async (route: string, body: string) => {
		_response = await request(application.httpServer)
			.post(route)
			.send(JSON.parse(body) as object);
	}
);

Then('the response status code should be {int}', (status: number) => {
	// _response = await _request.expect(status);
	assert.deepEqual(_response.status, status);
});

Then('the response body should be empty', () => {
	assert.deepEqual(_response.body, {});
});
