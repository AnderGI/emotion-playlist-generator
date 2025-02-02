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
const LogInSpotifyUserCommandHandler_1 = __importDefault(require("../../../../../../src/contexts/backoffice/spotify-user/application/log-in/LogInSpotifyUserCommandHandler"));
const SpotifyUserRegistar_1 = __importDefault(require("../../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserRegistar"));
const MockSpotifyUserRepository_1 = __importDefault(require("../../__mocks__/MockSpotifyUserRepository"));
const SpotifyUserMockEventBus_1 = __importDefault(require("../../__mocks__/SpotifyUserMockEventBus"));
const SpotifyUserMother_1 = require("../../domain/SpotifyUserMother");
const LogInSpotifyUserCommandMother_1 = require("./LogInSpotifyUserCommandMother");
const SpotifyUserLoggedInDomainEventMother_1 = require("./SpotifyUserLoggedInDomainEventMother");
describe('SpotifyUserRegistar', () => {
    describe('#logIn', () => {
        it('should register a non existing user', () => __awaiter(void 0, void 0, void 0, function* () {
            const spotifyUser = SpotifyUserMother_1.SpotifyUserMother.create();
            const spotifyUserRepository = new MockSpotifyUserRepository_1.default();
            const spotifyUserEventBus = new SpotifyUserMockEventBus_1.default();
            const spotifyUserRegister = new SpotifyUserRegistar_1.default(spotifyUserRepository, spotifyUserEventBus);
            const registerSpotifyUserCommand = LogInSpotifyUserCommandMother_1.LogInSpotifyUserCommandMother.fromUser(spotifyUser);
            const spotifyUserLoggedInDomainEvent = SpotifyUserLoggedInDomainEventMother_1.SpotifyUserLoggedInDomainEventMother.fromSpotifyUser(spotifyUser);
            const registerSpotifyUserCommandHandler = new LogInSpotifyUserCommandHandler_1.default(spotifyUserRegister);
            yield registerSpotifyUserCommandHandler.handle(registerSpotifyUserCommand);
            spotifyUserRepository.ensureRegisterHasBeenCalledWith(spotifyUser);
            spotifyUserEventBus.assertBusHasBeenCalledWith(spotifyUserLoggedInDomainEvent);
        }));
    });
});
