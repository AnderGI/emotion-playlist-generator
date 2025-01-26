import SpotifyUserLastTracks, {
	SpotifyUserLastTracksPrimitives
} from '../../../../../src/contexts/backoffice/spotify-user-last-tracks/domain/SpotifyUserLastTracks';
import SpotifyUserLastTracksRepository from '../../../../../src/contexts/backoffice/spotify-user-last-tracks/domain/SpotifyUserLastTracksRepository';

export default class MockSpotifyUserLastTracksRepository
	implements SpotifyUserLastTracksRepository
{
	private readonly mockSave: jest.Mock;
	constructor() {
		this.mockSave = jest.fn();
	}

	async save(user: SpotifyUserLastTracks): Promise<void> {
		this.mockSave(user);

		return Promise.resolve();
	}

	public assertMockSaveHasBeenCalledithCorrectPrimitives(
		expected: SpotifyUserLastTracksPrimitives
	): void {
		expect(this.mockSave).toHaveBeenCalledTimes(1);
		const calls = this.mockSave.mock.calls;
		expect(calls.length).toBe(1);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const actual = calls[0][0] as SpotifyUserLastTracks;
		expect(expected).toMatchObject(actual.toPrimitives());
	}
}
