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
const GetSpotifyUserLastTracksOnSepotifyUserLoggedIn_1 = __importDefault(require("../../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedIn"));
const SpotifyUserLastTracksSaver_1 = __importDefault(require("../../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/SpotifyUserLastTracksSaver"));
const SpotifyUserLoggedInDomainEventMother_1 = require("../../../spotify-user/application/register/SpotifyUserLoggedInDomainEventMother");
const SpotifyUserMother_1 = require("../../../spotify-user/domain/SpotifyUserMother");
const MockSpotifyUserLastTracksRepository_1 = __importDefault(require("../../__mocks__/MockSpotifyUserLastTracksRepository"));
const MockSpotifyUserLMockSpotifyUserLastTracksRetrieverastTracksRepository_1 = __importDefault(require("../../__mocks__/MockSpotifyUserLMockSpotifyUserLastTracksRetrieverastTracksRepository"));
const GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother_1 = require("./GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother");
describe('GetSpotifyUserLastTracksOnSepotifyUserLoggedIn', () => {
    describe('#on', () => {
        it("Should call Get User's Top Items", () => __awaiter(void 0, void 0, void 0, function* () {
            const spotifyUser = SpotifyUserMother_1.SpotifyUserMother.create();
            const event = SpotifyUserLoggedInDomainEventMother_1.SpotifyUserLoggedInDomainEventMother.fromSpotifyUser(spotifyUser);
            const command = GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother_1.GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother.fromEvent(event);
            const mockRetriever = new MockSpotifyUserLMockSpotifyUserLastTracksRetrieverastTracksRepository_1.default();
            const mockRepository = new MockSpotifyUserLastTracksRepository_1.default();
            const spotifyUserLastTracksRetriever = new SpotifyUserLastTracksSaver_1.default(mockRetriever, mockRepository);
            const subscriber = new GetSpotifyUserLastTracksOnSepotifyUserLoggedIn_1.default(spotifyUserLastTracksRetriever);
            yield subscriber.on(event);
            mockRetriever.assertSearchToHaveBeenCalledWithExpectedUser(command);
        }));
    });
});
