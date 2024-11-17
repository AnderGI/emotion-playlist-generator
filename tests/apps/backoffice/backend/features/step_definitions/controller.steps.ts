import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { createReadStream, unlink } from 'fs';
import { mkdir, readdir, rmdir } from 'fs/promises';
import path from 'path';
import request from 'supertest';

import { BackofficeBackendApp } from '../../../../../../src/apps/backoffice/backend/BackofficeBackendApp';

let _request: request.Test;
let application: BackofficeBackendApp;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
	_request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
	_response = await _request.expect(status);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
	_request = request(application.httpServer)
		.put(route)
		.send(JSON.parse(body) as object);
});

Given('I send a PUT request via form to {string}', (route: string) => {
	// Prepare the headers and the form data
	_request = request(application.httpServer)
		.put(route)
		.attach('image', createReadStream(path.join(__dirname, '/tmp/artist-white.jpg')));
});

Then('the response should be empty', () => {
	assert.deepStrictEqual(_response.body, {});
});

Then('the response should be:', (body: string) => {
	assert.deepStrictEqual(_response.body, JSON.parse(body));
});

BeforeAll(async () => {
	application = new BackofficeBackendApp();
	await application.start();
	// Ensure .uploads directory exists
	const uploadsPath = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', '.test-uploads');
	try {
		await mkdir(uploadsPath, { recursive: true });
	} catch (error) {
		console.log('Error creating .uploads directory:', error);
	}
});

AfterAll(async () => {
	await application.stop();
	await removeUploadFiles();
});

async function removeUploadFiles() {
	try {
		const uploadsPath = path.resolve(
			__dirname,
			'..',
			'..',
			'..',
			'..',
			'..',
			'..',
			'.test-uploads'
		);
		const filePaths = await readdir(uploadsPath);
		for (const filePath of filePaths) {
			unlink(path.resolve(uploadsPath, filePath), err => {
				if (err) {
					console.log(err);
				}
			});
		}
		await rmdir(uploadsPath);
	} catch (error) {
		console.log(error);
	}
}
