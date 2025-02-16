import LogInSpotifyUserCommandHandler from '../../../../../../src/contexts/backoffice/spotify-user/application/log-in/LogInSpotifyUserCommandHandler';
import SpotifyUserLogIner from '../../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserLogIner';
import MockSpotifyUserRepository from '../../__mocks__/MockSpotifyUserRepository';
import SpotifyUserMockEventBus from '../../__mocks__/SpotifyUserMockEventBus';
import { SpotifyUserMother } from '../../domain/SpotifyUserMother';
import { LogInSpotifyUserCommandMother } from './LogInSpotifyUserCommandMother';
import { SpotifyUserLoggedInDomainEventMother } from './SpotifyUserLoggedInDomainEventMother';

describe('SpotifyUserLogIner', () => {
	describe('#logIn', () => {
		it('should upsert a user', async () => {
			const spotifyUserRepository = new MockSpotifyUserRepository();
			const spotifyUserEventBus = new SpotifyUserMockEventBus();

			const command = LogInSpotifyUserCommandMother.create();
			const spotifyUser = SpotifyUserMother.fromCommand(command);
			const spotifyUserLoggedInDomainEvent =
				SpotifyUserLoggedInDomainEventMother.fromCommand(command);

			const spotifyUserLogIner = new SpotifyUserLogIner(spotifyUserRepository, spotifyUserEventBus);
			const registerSpotifyUserCommandHandler = new LogInSpotifyUserCommandHandler(
				spotifyUserLogIner
			);

			await registerSpotifyUserCommandHandler.handle(command);
			spotifyUserRepository.ensureRegisterHasBeenCalledWith(spotifyUser);
			spotifyUserEventBus.assertBusHasBeenCalledWith(spotifyUserLoggedInDomainEvent);
		});
	});
});
