import LogInSpotifyUserCommandHandler from '../../../../../src/contexts/backoffice/spotify-user/application/log-in/LogInSpotifyUserCommandHandler';
import SpotifyUserRegistar from '../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserRegistar';
import MockSpotifyUserRepository from '../../__mocks__/MockSpotifyUserRepository';
import SpotifyUserMockEventBus from '../../__mocks__/SpotifyUserMockEventBus';
import { SpotifyUserMother } from '../../domain/SpotifyUserMother';
import { LogInSpotifyUserCommandMother } from './LogInSpotifyUserCommandMother';
import { SpotifyUserLoggedInDomainEventMother } from './SpotifyUserLoggedInDomainEventMother';

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
			const registerSpotifyUserCommand = LogInSpotifyUserCommandMother.fromUser(spotifyUser);
			const spotifyUserLoggedInDomainEvent =
				SpotifyUserLoggedInDomainEventMother.fromSpotifyUser(spotifyUser);
			const registerSpotifyUserCommandHandler = new LogInSpotifyUserCommandHandler(
				spotifyUserRegister
			);

			await registerSpotifyUserCommandHandler.handle(registerSpotifyUserCommand);
			spotifyUserRepository.ensureRegisterHasBeenCalledWith(spotifyUser);
			spotifyUserEventBus.assertBusHasBeenCalledWith(spotifyUserLoggedInDomainEvent);
		});
	});
});
