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
const ImageSaver_1 = require("../../../../../../src/contexts/backoffice/image/application/submit/ImageSaver");
const SubmitImageCommandHandler_1 = __importDefault(require("../../../../../../src/contexts/backoffice/image/application/submit/SubmitImageCommandHandler"));
const ImageMockEventBus_1 = require("../../__mocks__/ImageMockEventBus");
const MockImageRepository_1 = require("../../__mocks__/MockImageRepository");
const CreateImageCommandMother_1 = require("../../domain/CreateImageCommandMother");
const ImageCreatedDomainEventMother_1 = require("../../domain/ImageCreatedDomainEventMother");
const ImageMother_1 = require("../../domain/ImageMother");
class CreateImageUseCaseArrenger {
    constructor() {
        this.imageRepository = new MockImageRepository_1.MockImageRepository();
        this.eventBus = new ImageMockEventBus_1.ImageMockEventBus();
        this.imageSaver = new ImageSaver_1.ImageSaver(this.imageRepository, this.eventBus);
        this.handler = new SubmitImageCommandHandler_1.default(this.imageSaver);
    }
    static create() {
        return new CreateImageUseCaseArrenger();
    }
    executeHappyPath() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.createCommand();
            const image = this.createImageFromCommand(command);
            const event = this.createImageCreatedEvent(image);
            yield this.handler.handle(command);
            this.imageRepository.assertSaveHasBeenCalledWith(image);
            this.eventBus.assertBusHasBeenCalledWith(event);
        });
    }
    createCommand() {
        return CreateImageCommandMother_1.CreateImageCommandMother.random();
    }
    createImageFromCommand(command) {
        return ImageMother_1.ImageMother.fromCommand(command);
    }
    createImageCreatedEvent(image) {
        return ImageCreatedDomainEventMother_1.ImageCreatedDomainEventMother.create(image);
    }
}
exports.default = CreateImageUseCaseArrenger;
