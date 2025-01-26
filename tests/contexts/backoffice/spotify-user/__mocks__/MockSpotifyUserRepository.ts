import SpotifyUser from '../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';
import { SpotifyUserRepository } from '../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUserRepository';

export default class MockSpotifyUserRepository implements SpotifyUserRepository {
	private readonly mockRegister: jest.Mock;
	constructor() {
		this.mockRegister = jest.fn();
	}

	async save(spotifyUser: SpotifyUser): Promise<void> {
		await this.mockRegister(spotifyUser);
	}

	ensureRegisterHasBeenCalledWith(spotifyUser: SpotifyUser): void {
		expect(this.mockRegister).toHaveBeenCalledWith(spotifyUser);
	}
}
