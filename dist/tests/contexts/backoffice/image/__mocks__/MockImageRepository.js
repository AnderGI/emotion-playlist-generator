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
exports.MockImageRepository = void 0;
const ImageIdMother_1 = require("../domain/ImageIdMother");
class MockImageRepository {
    constructor() {
        this.saveMock = jest.fn();
        this.searchMock = jest.fn();
    }
    save(image) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveMock(image);
            this.searchMock(ImageIdMother_1.ImageIdMother.create(image.getId()));
            return Promise.resolve();
        });
    }
    assertSaveHasBeenCalledWith(image) {
        expect(this.saveMock).toBeCalledWith(image);
        this.assertSearchHasBeenCalled(ImageIdMother_1.ImageIdMother.create(image.getId()));
    }
    assertSearchHasBeenCalled(imageId) {
        expect(this.searchMock).toBeCalledWith(imageId);
    }
}
exports.MockImageRepository = MockImageRepository;
