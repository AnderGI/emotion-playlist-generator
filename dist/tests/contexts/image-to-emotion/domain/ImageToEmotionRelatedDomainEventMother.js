"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageToEmotionRelatedDomainEventMother = void 0;
const ImageToEmotionRelatedDomainEvent_1 = __importDefault(require("../../../../src/contexts/backoffice/image-to-emotion/domain/relate/ImageToEmotionRelatedDomainEvent"));
class ImageToEmotionRelatedDomainEventMother {
    static create({ emotion, filename }) {
        return new ImageToEmotionRelatedDomainEvent_1.default({ aggregateId: emotion, filename });
    }
}
exports.ImageToEmotionRelatedDomainEventMother = ImageToEmotionRelatedDomainEventMother;
