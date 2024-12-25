import { ImageCreatedDomainEvent } from '../../../../src/contexts/backoffice/image/application/save/ImageCreatedDomainEvent';
import { DomainEvent } from '../../../../src/contexts/shared/domain/event/DomainEvent';
import MockEventBus from '../../shared/__mocks__/MockEventBus';

export class ImageMockEventBus extends MockEventBus<ImageCreatedDomainEvent> {
	public assertBusHasBeenCalledWith(event: DomainEvent): void {
		const publishMockCalls = this.publishMock.mock.calls;

		expect(publishMockCalls.length).toBeGreaterThan(0);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const lastPublishedEvent = publishMockCalls[0][0] as unknown as ImageCreatedDomainEvent;
		expect(event.toPrimitives()).toMatchObject(lastPublishedEvent.toPrimitives());
	}
}
