import SpotifyUserRegisteredDomainEvent from '../../../../src/contexts/backoffice/spotify-user/application/log-in/SpotifyUserRegisteredDomainEvent';
import MockEventBus from '../../shared/__mocks__/MockEventBus';

export default class SpotifyUserMockEventBus extends MockEventBus<SpotifyUserRegisteredDomainEvent> {
	assertBusHasBeenCalledWith(event: SpotifyUserRegisteredDomainEvent): void {
		const calls = this.publishMock.mock.calls;
		expect(calls.length).toBeGreaterThan(0);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const publishedDomainEvent = calls[0][0] as unknown as SpotifyUserRegisteredDomainEvent;
		expect(event.toPrimitives()).toMatchObject(publishedDomainEvent.toPrimitives());
	}
}
