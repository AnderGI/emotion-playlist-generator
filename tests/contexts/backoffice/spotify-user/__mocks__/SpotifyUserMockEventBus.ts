import { SpotifyUserLoggedInDomainEvent } from '../../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserLoggedInDomainEvent';
import MockEventBus from '../../../shared/__mocks__/MockEventBus';

export default class SpotifyUserMockEventBus extends MockEventBus<SpotifyUserLoggedInDomainEvent> {
	assertBusHasBeenCalledWith(event: SpotifyUserLoggedInDomainEvent): void {
		const calls = this.publishMock.mock.calls;
		expect(calls.length).toBeGreaterThan(0);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const publishedDomainEvent = calls[0][0] as unknown as SpotifyUserLoggedInDomainEvent;
		expect(event.toPrimitives()).toMatchObject(publishedDomainEvent.toPrimitives());
	}
}
