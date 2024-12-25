import { DomainEvent } from '../../../../src/contexts/shared/domain/event/DomainEvent';
import { EventBus } from '../../../../src/contexts/shared/domain/event/EventBus';

export default abstract class MockEventBus<T extends DomainEvent> implements EventBus {
	readonly publishMock: jest.Mock;

	constructor() {
		this.publishMock = jest.fn();
	}

	abstract assertBusHasBeenCalledWith(event: T): void;

	async publish(event: DomainEvent): Promise<void> {
		this.publishMock(event);

		return Promise.resolve();
	}

	assertOneEventPublication(): void {
		expect(this.publishMock.mock.calls.length).toBeGreaterThan(0);
	}

	getPublishedEvent(): T {
		const publishMockCall = this.publishMock.mock.calls;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		return publishMockCall[0][0] as unknown as T;
	}
}
