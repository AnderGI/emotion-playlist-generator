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
Object.defineProperty(exports, "__esModule", { value: true });
class MockEventBus {
    constructor() {
        this.publishMock = jest.fn();
    }
    publish(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.publishMock(event);
            return Promise.resolve();
        });
    }
    assertOneEventPublication() {
        expect(this.publishMock.mock.calls.length).toBeGreaterThan(0);
    }
    getPublishedEvent() {
        const publishMockCall = this.publishMock.mock.calls;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return publishMockCall[0][0];
    }
}
exports.default = MockEventBus;
