import RegisterSpotifyUserCommandHandler from '../../../../../src/contexts/backoffice/spotify-user/application/log-in/LogInSpotifyUserCommandHandler';
import SpotifyUserRegistar from '../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserRegistar';
import MockSpotifyUserRepository from '../../__mocks__/MockSpotifyUserRepository';
import SpotifyUserMockEventBus from '../../__mocks__/SpotifyUserMockEventBus';
import { SpotifyUserMother } from '../../domain/SpotifyUserMother';
import { RegisterSpotifyUserCommandMother } from './RegisterSpotifyUserCommandMother';
import { SpotifyUserRegisteredDomainEventMother } from './SpotifyUserRegisteredDomainEventMother';

describe('SpotifyUserRegistar', () => {
	describe('#logIn', () => {
		it('should register a non existing user', async () => {
			const spotifyUser = SpotifyUserMother.create();
			const spotifyUserRepository = new MockSpotifyUserRepository();
			const spotifyUserEventBus = new SpotifyUserMockEventBus();
			const spotifyUserRegister = new SpotifyUserRegistar(
				spotifyUserRepository,
				spotifyUserEventBus
			);
			const registerSpotifyUserCommand = RegisterSpotifyUserCommandMother.fromUser(spotifyUser);
			const spotifyUserRegisteredDomainEvent =
				SpotifyUserRegisteredDomainEventMother.fromSpotifyUser(spotifyUser);
			const registerSpotifyUserCommandHandler = new RegisterSpotifyUserCommandHandler(
				spotifyUserRegister
			);

			await registerSpotifyUserCommandHandler.handle(registerSpotifyUserCommand);
			spotifyUserRepository.ensureRegisterHasBeenCalledWith(spotifyUser);
			spotifyUserEventBus.assertBusHasBeenCalledWith(spotifyUserRegisteredDomainEvent);
		});
	});
});
