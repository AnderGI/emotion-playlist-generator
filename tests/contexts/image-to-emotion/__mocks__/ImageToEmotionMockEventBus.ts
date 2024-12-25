import ImageToEmotionRelatedDomainEvent from '../../../../src/contexts/backoffice/image-to-emotion/domain/relate/ImageToEmotionRelatedDomainEvent';
import MockEventBus from '../../shared/__mocks__/MockEventBus';

export default class ImageToEmotionMockEventBus extends MockEventBus<ImageToEmotionRelatedDomainEvent> {
	assertBusHasBeenCalledWith(event: ImageToEmotionRelatedDomainEvent): void {
		this.assertOneEventPublication();
		const publishedEvent = this.getPublishedEvent();
		expect(event.toPrimitives()).toMatchObject(publishedEvent.toPrimitives());
	}
}
