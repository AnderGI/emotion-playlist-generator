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
const SpotifyUserRepositoryArrenger_1 = __importDefault(require("./SpotifyUserRepositoryArrenger"));
const TestSpotifyUserRepositoryFactory_1 = __importDefault(require("./TestSpotifyUserRepositoryFactory"));
describe('TypeOrmSpotifyUserRepository', () => {
    describe('#save', () => {
        it('should save a spotify user', () => __awaiter(void 0, void 0, void 0, function* () {
            const arrenger = new SpotifyUserRepositoryArrenger_1.default(TestSpotifyUserRepositoryFactory_1.default.getRepository(), EnvironmentArrengerFactory_1.default.getArranger());
            yield arrenger.saveSpotifyUser();
        }));
    });
});
