import SpotifyUserRegistar from '../../../../../src/contexts/backoffice/spotify-user/application/registar/SpotifyUserRegistar';
import MockSpotifyUserRepository from '../../__mock__/MockSpotifyUserRepository';
import { SpotifyUserMother } from '../../domain/SpotifyUserMother';
import { RegisterSpotifyUserCommandMother } from './RegisterSpotifyUserCommandMother';

describe('SpotifyUserRegistar', () => {
	describe('#register', () => {
		it('should register a user', async () => {
			const spotifyUser = SpotifyUserMother.random();
			const spotifyUserRepository = new MockSpotifyUserRepository();
			const spotifyUserRegister = new SpotifyUserRegistar(spotifyUserRepository);
			const registerSpotifyUserCommand = RegisterSpotifyUserCommandMother.fromUser(spotifyUser);

			await spotifyUserRegister.registar(registerSpotifyUserCommand);
			spotifyUserRepository.ensureRegisterHasBeenCalledWith(spotifyUser);
		});
	});
});
