import { SpotifyUserLoggedInDomainEvent } from '../../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import GetSpotifyUserLastTracksOnSepotifyUserLoggedIn from '../../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/GetSpotifyUserLastTracksOnSepotifyUserLoggedIn';
import SpotifyUserLastTracksSaver from '../../../../../../src/contexts/backoffice/spotify-user-last-tracks/application/save-spotify-user-last-tracks/SpotifyUserLastTracksSaver';
import { SpotifyUserLoggedInDomainEventMother } from '../../../spotify-user/application/register/SpotifyUserLoggedInDomainEventMother';
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
			const spotifyUserLastTracksRetriever: SpotifyUserLastTracksSaver =
				new SpotifyUserLastTracksSaver(mockRetriever, mockRepository);
			const subscriber = new GetSpotifyUserLastTracksOnSepotifyUserLoggedIn(
				spotifyUserLastTracksRetriever
			);

			await subscriber.on(event);

			mockRetriever.assertSearchToHaveBeenCalledWithExpectedUser(command);
		});
	});
});
