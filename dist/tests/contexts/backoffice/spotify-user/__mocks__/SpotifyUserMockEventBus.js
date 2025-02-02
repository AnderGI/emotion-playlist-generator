"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MockEventBus_1 = __importDefault(require("../../../shared/__mocks__/MockEventBus"));
class SpotifyUserMockEventBus extends MockEventBus_1.default {
    assertBusHasBeenCalledWith(event) {
        const calls = this.publishMock.mock.calls;
        expect(calls.length).toBeGreaterThan(0);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const publishedDomainEvent = calls[0][0];
        expect(event.toPrimitives()).toMatchObject(publishedDomainEvent.toPrimitives());
    }
}
exports.default = SpotifyUserMockEventBus;
