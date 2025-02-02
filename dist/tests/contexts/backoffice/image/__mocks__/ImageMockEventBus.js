"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMockEventBus = void 0;
const MockEventBus_1 = __importDefault(require("../../../shared/__mocks__/MockEventBus"));
class ImageMockEventBus extends MockEventBus_1.default {
    assertBusHasBeenCalledWith(event) {
        const publishMockCalls = this.publishMock.mock.calls;
        expect(publishMockCalls.length).toBeGreaterThan(0);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const lastPublishedEvent = publishMockCalls[0][0];
        expect(event.toPrimitives()).toMatchObject(lastPublishedEvent.toPrimitives());
    }
}
exports.ImageMockEventBus = ImageMockEventBus;
