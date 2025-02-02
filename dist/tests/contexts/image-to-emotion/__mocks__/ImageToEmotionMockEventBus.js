"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MockEventBus_1 = __importDefault(require("../../shared/__mocks__/MockEventBus"));
class ImageToEmotionMockEventBus extends MockEventBus_1.default {
    assertBusHasBeenCalledWith(event) {
        this.assertOneEventPublication();
        const publishedEvent = this.getPublishedEvent();
        expect(event.toPrimitives()).toMatchObject(publishedEvent.toPrimitives());
    }
}
exports.default = ImageToEmotionMockEventBus;
