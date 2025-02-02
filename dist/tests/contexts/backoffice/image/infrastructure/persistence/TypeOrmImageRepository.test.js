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
const EnvironmentArrengerFactory_1 = __importDefault(require("../../../../shared/infrastructure/arranger/EnvironmentArrengerFactory"));
const ImageRepositoryArrenger_1 = require("./ImageRepositoryArrenger");
const TestImageRepositoryFactory_1 = __importDefault(require("./TestImageRepositoryFactory"));
describe('TypeOrmImageRepository', () => {
    describe('#save', () => {
        it('should save a course', () => __awaiter(void 0, void 0, void 0, function* () {
            const arrenger = new ImageRepositoryArrenger_1.ImageRepositoryArrenger(TestImageRepositoryFactory_1.default.getRepository(), EnvironmentArrengerFactory_1.default.getArranger());
            yield arrenger.saveImage();
        }));
    });
});
