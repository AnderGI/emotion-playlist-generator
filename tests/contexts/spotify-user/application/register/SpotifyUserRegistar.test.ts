import { randomBytes } from 'crypto';

import RegisterSpotifyUserCommandHandler from '../../../../../src/contexts/backoffice/spotify-user/application/registar/RegisterSpotifyUserCommandHandler';
import SpotifyUserRegistar from '../../../../../src/contexts/backoffice/spotify-user/application/registar/SpotifyUserRegistar';
import MockSpotifyUserRepository from '../../__mocks__/MockSpotifyUserRepository';
import SpotifyUserMockEventBus from '../../__mocks__/SpotifyUserMockEventBus';
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
			const accessToken = randomBytes(32).toString('hex');
			const registerSpotifyUserCommand = RegisterSpotifyUserCommandMother.fromUser(
				spotifyUser,
				accessToken
			);
			const spotifyUserRegisteredDomainEvent =
				SpotifyUserRegisteredDomainEventMother.fromSpotifyUser(spotifyUser, accessToken);
			const registerSpotifyUserCommandHandler = new RegisterSpotifyUserCommandHandler(
				spotifyUserRegister
			);

			await registerSpotifyUserCommandHandler.handle(registerSpotifyUserCommand);
			spotifyUserRepository.ensureRegisterHasBeenCalledWith(spotifyUser);
			spotifyUserEventBus.assertBusHasBeenCalledWith(spotifyUserRegisteredDomainEvent);
		});
	});
});
