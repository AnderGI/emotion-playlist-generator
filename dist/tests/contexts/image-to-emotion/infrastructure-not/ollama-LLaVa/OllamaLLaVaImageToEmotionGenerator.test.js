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
const ImageToEmotion_1 = __importDefault(require("../../../../../src/contexts/backoffice/image-to-emotion/domain/ImageToEmotion"));
const OllamaLLaVaImageToEmotionGenerator_1 = __importDefault(require("../../../../../src/contexts/backoffice/image-to-emotion/infrastructure/OllamaLLaVaImageToEmotionGenerator"));
const ImageFilenameMother_1 = require("../../../image/domain/ImageFilenameMother");
describe('OllamaLLaVaImageToEmotionGenerator', () => {
    describe('#relate', () => {
        const ollamaLLaVaImageToEmotionGenerator = new OllamaLLaVaImageToEmotionGenerator_1.default();
        let response;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            response = yield ollamaLLaVaImageToEmotionGenerator.relate(new ImageToEmotion_1.default(ImageFilenameMother_1.ImageFilenameMother.create('artist-white.png')));
        }), 600000);
        it('should generate only one emotion per image', () => {
            // Validamos que el objeto tenga la propiedad 'emotion'
            expect(response).toHaveProperty('emotion');
            // Validamos que 'emotion' sea una cadena no vacía
            expect(typeof response.emotion).toBe('string');
            expect(response.emotion).not.toBe('');
            // Imprimimos la respuesta en caso de querer más información de depuración
            console.log('Generated emotion:', response.emotion);
        });
    });
});
