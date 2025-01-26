import GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand from '../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand';
import { SpotifyUserLastTracksData } from '../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/SpotifyUserLastTracksData';
import SpotifyUserLastTracksRetriever from '../../../../../src/contexts/backoffice/spotify-user-last-tracks/domain/SpotifyUserLastTracksRetriever';
import { GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother } from '../application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother';
import * as data from './MockRetrieverResponse.json';

export default class MockSpotifyUserLastTracksRetriever implements SpotifyUserLastTracksRetriever {
	private readonly mockSearch: jest.Mock;
	constructor() {
		this.mockSearch = jest.fn();
	}

	public async retrieve(
		command: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand
	): Promise<SpotifyUserLastTracksData> {
		this.mockSearch(command);

		return Promise.resolve(data);
	}

	public assertSearchToHaveBeenCalledWithExpectedUser(
		expected: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother
	): void {
		const calls = this.mockSearch.mock.calls;
		expect(calls.length).toBe(1);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const actual = calls[0][0] as GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother;
		expect(actual).toMatchObject(expected);
	}
}
