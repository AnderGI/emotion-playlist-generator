"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = __importDefault(require("assert"));
const supertest_1 = __importDefault(require("supertest"));
const BackofficeBackendApp_1 = __importDefault(require("../../../../../../src/apps/backoffice/backend/BackofficeBackendApp"));
// let _request: request.Test;
let application;
let _response;
(0, cucumber_1.BeforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    application = new BackofficeBackendApp_1.default();
    yield application.start();
    console.log('iniciado');
}));
(0, cucumber_1.AfterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield application.stop();
}));
(0, cucumber_1.Given)('I send a GET request to {string}', (route) => __awaiter(void 0, void 0, void 0, function* () {
    _response = yield (0, supertest_1.default)(application.httpServer).get(route);
}));
(0, cucumber_1.Given)('I send a PUT request to {string} with JSON request body:', (route, body) => __awaiter(void 0, void 0, void 0, function* () {
    _response = yield (0, supertest_1.default)(application.httpServer)
        .put(route)
        .send(JSON.parse(body));
}));
(0, cucumber_1.Then)('the response status code should be {int}', (status) => {
    // _response = await _request.expect(status);
    assert_1.default.deepEqual(_response.status, status);
});
(0, cucumber_1.Then)('the response body should be empty', () => {
    assert_1.default.deepEqual(_response.body, {});
});
