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
exports.ImageRepositoryArrenger = void 0;
const ImageMother_1 = require("../../domain/ImageMother");
class ImageRepositoryArrenger {
    constructor(repository, environmentArranger) {
        this.repository = repository;
        this.environmentArranger = environmentArranger;
    }
    saveImage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cleanFirst();
            const image = ImageMother_1.ImageMother.random();
            console.log(image);
            yield this.repository.save(image);
            yield this.cleanEnd();
        });
    }
    cleanFirst() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.environmentArranger.clean();
        });
    }
    cleanEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.environmentArranger.clean();
            yield this.environmentArranger.close();
        });
    }
}
exports.ImageRepositoryArrenger = ImageRepositoryArrenger;
