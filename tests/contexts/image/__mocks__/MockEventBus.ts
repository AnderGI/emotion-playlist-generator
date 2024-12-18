import { ImageCreatedDomainEvent } from '../../../../src/contexts/backoffice/image/application/save/ImageCreatedDomainEvent';
import { DomainEvent } from '../../../../src/contexts/shared/domain/event/DomainEvent';
import { EventBus } from '../../../../src/contexts/shared/domain/event/EventBus';

export class MockEventBus implements EventBus {
	private readonly publishMock: jest.Mock;

	constructor() {
		this.publishMock = jest.fn();
	}

	async publish(event: DomainEvent): Promise<void> {
		this.publishMock(event);

		return Promise.resolve();
	}

	public assertBusHasBeenCalledWith(event: DomainEvent): void {
		const publishMockCalls = this.publishMock.mock.calls;

		expect(publishMockCalls.length).toBeGreaterThan(0);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const lastPublishedEvent = publishMockCalls[0][0] as unknown as ImageCreatedDomainEvent;
		expect(event.toPrimitives()).toMatchObject(lastPublishedEvent.toPrimitives());
	}
}
