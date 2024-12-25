import SpotifyUser from '../../domain/SpotifyUser';
import { SpotifyUserRepository } from '../../domain/SpotifyUserRepository';
import RegistarSpotifyUserCommand from './RegisterSpotifyUserCommand';

export default class SpotifyUserRegistar {
	constructor(private readonly spotifyUserRepository: SpotifyUserRepository) {}
	public async registar(command: RegistarSpotifyUserCommand): Promise<void> {
		const { id, country, displayName, email } = command;
		await this.spotifyUserRepository.register(
			SpotifyUser.fromPrimitives({ id, country, displayName, email })
		);
	}
}
