import { SpotifyUserLoggedInDomainEvent } from '../../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import GetSpotifyUserLastTracksOnSpotifyUserLoggedIn from '../../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSpotifyUserLoggedIn';
import SpotifyUserLastTracksUpserter from '../../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/SpotifyUserLastTracksUpserter';
import { SpotifyUserLoggedInDomainEventMother } from '../../../spotify-user/application/log-in/SpotifyUserLoggedInDomainEventMother';
import { SpotifyUserMother } from '../../../spotify-user/domain/SpotifyUserMother';
import MockSpotifyUserLastTracksRepository from '../../__mocks__/MockSpotifyUserLastTracksRepository';
import MockSpotifyUserLastTracksRetriever from '../../__mocks__/MockSpotifyUserLMockSpotifyUserLastTracksRetrieverastTracksRepository';
import { GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother } from './GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother';

describe('GetSpotifyUserLastTracksOnSepotifyUserLoggedIn', () => {
	describe('#on', () => {
		it("Should call Get User's Top Items", async () => {
			const spotifyUser = SpotifyUserMother.create();
			const event: SpotifyUserLoggedInDomainEvent =
				SpotifyUserLoggedInDomainEventMother.fromSpotifyUser(spotifyUser);
			const command = GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandMother.fromEvent(event);
			const mockRetriever = new MockSpotifyUserLastTracksRetriever();
			const mockRepository = new MockSpotifyUserLastTracksRepository();
			const spotifyUserLastTracksRetriever: SpotifyUserLastTracksUpserter =
				new SpotifyUserLastTracksUpserter(mockRetriever, mockRepository);
			const subscriber = new GetSpotifyUserLastTracksOnSpotifyUserLoggedIn(
				spotifyUserLastTracksRetriever
			);

			await subscriber.on(event);

			mockRetriever.assertSearchToHaveBeenCalledWithExpectedUser(command);
		});
	});
});
