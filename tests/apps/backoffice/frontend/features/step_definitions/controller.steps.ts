import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';

import BackofficeFrontendApp from '../../../../../../src/apps/backoffice/frontend/BackofficeFrontendApp';

// let _request: request.Test;
let application: BackofficeFrontendApp;
let _response: request.Response;

BeforeAll(async () => {
	application = new BackofficeFrontendApp();
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
	'I send a GET request to {string} with a jwt cookie appended {string}',
	async (route: string, token: string) => {
		_response = await request(application.httpServer)
			.get(route)
			.set('Cookie', [`access_token=${token}`]);
	}
);

Then('the response status code should be {int}', (status: number) => {
	assert.deepEqual(_response.status, status);
});

Then('user should be redirected to {string}', (route: string) => {
	assert.ok(_response.headers['location'], route);
});

Then('the response header {string} should be {string}', (header: string, type: string) => {
	assert.equal(_response.headers[header], type);
});

Then('the response text should contain {string}', (pageContent: string) => {
	assert.ok(_response.text.includes(pageContent));
});
