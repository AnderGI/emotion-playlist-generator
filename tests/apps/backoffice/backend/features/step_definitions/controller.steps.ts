import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';

import BackofficeBackendApp from '../../../../../../src/apps/backoffice/backend/BackofficeBackendApp';

let _request: request.Test;
let application: BackofficeBackendApp;
let _response: request.Response;

BeforeAll(async () => {
	application = new BackofficeBackendApp();
	await application.start();
});

AfterAll(async () => {
	await application.stop();
});

Given('I send a GET request to {string}', async (route: string) => {
	_request = request(application.httpServer).get(route);
	_response = await _request;
});

Then('the response status should be {int}', async (status: number) => {
	_response = await _request.expect(status);
});
Then('the response headers location should include {string}', (location: string) => {
	assert.ok(_response.headers['location'].includes(location));
});
