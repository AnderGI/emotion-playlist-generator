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
class MockImageToEmotionRelator {
    constructor(mockEmotion) {
        this.mockEmotion = mockEmotion;
        this.relateMock = jest.fn();
    }
    relate(imageToEmotion) {
        return __awaiter(this, void 0, void 0, function* () {
            this.relateMock(imageToEmotion);
            return Promise.resolve({ emotion: this.mockEmotion });
        });
    }
    assertRelateHasBeenCalledWith(imageToEmotion) {
        expect(this.relateMock).toHaveBeenCalledWith(imageToEmotion);
    }
}
exports.default = MockImageToEmotionRelator;
