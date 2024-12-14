import ImageToEmotionRelatedDomainEvent from '../../../../src/contexts/backoffice/image-to-emotion/domain/relate/ImageToEmotionRelatedDomainEvent';
import { DomainEvent } from '../../../../src/contexts/shared/domain/event/DomainEvent';
import { EventBus } from '../../../../src/contexts/shared/domain/event/EventBus';

export default class MockImageToEmotionEventBus implements EventBus {
	private readonly mockPublish: jest.Mock;
	constructor() {
		this.mockPublish = jest.fn();
	}

	async publish(event: DomainEvent): Promise<void> {
		this.mockPublish(event);

		return Promise.resolve();
	}

	assertPublishHasBeenCalled(): void {
		const publishMockCalls = this.mockPublish.mock.calls;

		expect(publishMockCalls.length).toBeGreaterThan(0);

		const lastPublishedEvent =
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			publishMockCalls[0][0] as unknown as ImageToEmotionRelatedDomainEvent;
		expect(lastPublishedEvent).toBeInstanceOf(ImageToEmotionRelatedDomainEvent);
	}
}
