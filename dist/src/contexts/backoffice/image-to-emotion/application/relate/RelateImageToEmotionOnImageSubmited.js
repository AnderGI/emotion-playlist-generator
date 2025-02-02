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
exports.RelateImageToEmotionOnImageSubmited = void 0;
const ImageSubmitedDomainEvent_1 = require("../../../image/application/submit/ImageSubmitedDomainEvent");
const RelateImageToEmotionCommand_1 = __importDefault(require("./RelateImageToEmotionCommand"));
class RelateImageToEmotionOnImageSubmited {
    constructor(imageToEmotionGenerator) {
        this.imageToEmotionGenerator = imageToEmotionGenerator;
    }
    subscribedTo() {
        return [ImageSubmitedDomainEvent_1.ImageSubmitedDomainEvent];
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    on(domainEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('RelateImageToEmotionOnImageSubmited');
            // console.log(this.imageToEmotionGenerator);
            const { filename } = domainEvent;
            yield this.imageToEmotionGenerator.run(new RelateImageToEmotionCommand_1.default(filename));
        });
    }
    queueName() {
        return 'andergi.backoffice.image-to-emotion.relate_image_to_emotion_on_image_submited';
    }
}
exports.RelateImageToEmotionOnImageSubmited = RelateImageToEmotionOnImageSubmited;
