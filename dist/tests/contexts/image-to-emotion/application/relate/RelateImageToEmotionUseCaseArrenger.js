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
const ImageFilename_1 = require("../../../../../src/contexts/backoffice/image/domain/ImageFilename");
const ImageToEmotionGenerator_1 = __importDefault(require("../../../../../src/contexts/backoffice/image-to-emotion/application/relate/ImageToEmotionGenerator"));
const RelateImageToEmotionOnImageSubmited_1 = require("../../../../../src/contexts/backoffice/image-to-emotion/application/relate/RelateImageToEmotionOnImageSubmited");
const ImageToEmotion_1 = __importDefault(require("../../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotion"));
const ImageCreatedDomainEventMother_1 = require("../../../image/domain/ImageCreatedDomainEventMother");
const ImageToEmotionMockEventBus_1 = __importDefault(require("../../__mocks__/ImageToEmotionMockEventBus"));
const MockImageToEmotionRelator_1 = __importDefault(require("../../__mocks__/MockImageToEmotionRelator"));
const EmotioNameMother_1 = require("../../domain/EmotioNameMother");
const ImageToEmotionRelatedDomainEventMother_1 = require("../../domain/ImageToEmotionRelatedDomainEventMother");
class RelateImageToEmotionUseCaseArrenger {
    constructor() {
        this.EMOTION = EmotioNameMother_1.EmotioNameMother.random();
        this.imageToEmotionRelator = new MockImageToEmotionRelator_1.default(this.EMOTION);
        this.eventBus = new ImageToEmotionMockEventBus_1.default();
        this.imageToEmotionGenerator = new ImageToEmotionGenerator_1.default(this.imageToEmotionRelator, this.eventBus);
        this.relateImageToEmotionOnImageCreated = new RelateImageToEmotionOnImageSubmited_1.RelateImageToEmotionOnImageSubmited(this.imageToEmotionGenerator);
    }
    static create() {
        return new RelateImageToEmotionUseCaseArrenger();
    }
    executeHappyPath() {
        return __awaiter(this, void 0, void 0, function* () {
            const imageCreatedDomainEvent = ImageCreatedDomainEventMother_1.ImageCreatedDomainEventMother.fromRandomImage();
            const imageToEmotionRelatedDomainEvent = ImageToEmotionRelatedDomainEventMother_1.ImageToEmotionRelatedDomainEventMother.create({
                emotion: this.EMOTION,
                filename: imageCreatedDomainEvent.filename
            });
            yield this.relateImageToEmotionOnImageCreated.on(imageCreatedDomainEvent);
            this.imageToEmotionRelator.assertRelateHasBeenCalledWith(new ImageToEmotion_1.default(ImageFilename_1.ImageFilename.create(imageCreatedDomainEvent.filename)));
            this.eventBus.assertBusHasBeenCalledWith(imageToEmotionRelatedDomainEvent);
        });
    }
}
exports.default = RelateImageToEmotionUseCaseArrenger;
