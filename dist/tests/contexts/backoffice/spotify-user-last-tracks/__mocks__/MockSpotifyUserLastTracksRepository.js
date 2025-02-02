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
Object.defineProperty(exports, "__esModule", { value: true });
class MockSpotifyUserLastTracksRepository {
    constructor() {
        this.mockSave = jest.fn();
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mockSave(user);
            return Promise.resolve();
        });
    }
    assertMockSaveHasBeenCalledithCorrectPrimitives(expected) {
        expect(this.mockSave).toHaveBeenCalledTimes(1);
        const calls = this.mockSave.mock.calls;
        expect(calls.length).toBe(1);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const actual = calls[0][0];
        expect(expected).toMatchObject(actual.toPrimitives());
    }
}
exports.default = MockSpotifyUserLastTracksRepository;
