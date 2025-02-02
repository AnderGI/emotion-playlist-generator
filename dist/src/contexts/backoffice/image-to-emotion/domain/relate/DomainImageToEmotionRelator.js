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
const ImageToEmotion_1 = __importDefault(require("../ImageToEmotion"));
const ImageToEmotionRelatedDomainEvent_1 = __importDefault(require("./ImageToEmotionRelatedDomainEvent"));
class DomainImageToEmotionRelator {
    static relate(imageToEmotionRelator, eventBus) {
        return (relateImageToEmotionCommand) => __awaiter(this, void 0, void 0, function* () {
            // console.log('DomainImageToEmotionRelator');
            const { filename } = relateImageToEmotionCommand;
            const imageToEmotion = ImageToEmotion_1.default.create({ filename });
            const result = yield imageToEmotionRelator.relate(imageToEmotion);
            const { emotion } = result;
            const domainEvent = ImageToEmotionRelatedDomainEvent_1.default.fromPrimitives({
                aggregateId: emotion,
                attributes: { filename }
            });
            // console.log('image to emotion related : ', domainEvent);
            yield eventBus.publish(domainEvent);
        });
    }
}
exports.default = DomainImageToEmotionRelator;
