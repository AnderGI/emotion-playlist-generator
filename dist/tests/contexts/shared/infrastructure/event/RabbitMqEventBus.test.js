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
const dependency_injection_1 = __importDefault(require("../../../../../src/apps/backoffice/backend/dependency-injection"));
const ImageCreatedDomainEventMother_1 = require("../../../image/domain/ImageCreatedDomainEventMother");
const ImageMother_1 = require("../../../image/domain/ImageMother");
describe('RabbitMQEventBus', () => {
    describe('#publish', () => {
        it('It should publish an event correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            const image = ImageMother_1.ImageMother.random();
            const imageCreatedDomainEvent = ImageCreatedDomainEventMother_1.ImageCreatedDomainEventMother.create(image);
            const eventBus = dependency_injection_1.default.get('backoffice.shared.EventBus');
            yield eventBus.publish(imageCreatedDomainEvent);
        }));
    });
});
