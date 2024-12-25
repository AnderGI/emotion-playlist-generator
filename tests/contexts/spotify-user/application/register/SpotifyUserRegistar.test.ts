import RegisterSpotifyUserCommandHandler from '../../../../../src/contexts/backoffice/spotify-user/application/registar/RegisterSpotifyUserCommandHandler';
import SpotifyUserRegistar from '../../../../../src/contexts/backoffice/spotify-user/application/registar/SpotifyUserRegistar';
import MockSpotifyUserRepository from '../../__mock__/MockSpotifyUserRepository';
import SpotifyUserMockEventBus from '../../__mock__/SpotifyUserMockEventBus';
import { SpotifyUserMother } from '../../domain/SpotifyUserMother';
import { RegisterSpotifyUserCommandMother } from './RegisterSpotifyUserCommandMother';
import { SpotifyUserRegisteredDomainEventMother } from './SpotifyUserRegisteredDomainEventMother';

describe('SpotifyUserRegistar', () => {
	describe('#register', () => {
		it('should register a user', async () => {
			const spotifyUser = SpotifyUserMother.random();
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
