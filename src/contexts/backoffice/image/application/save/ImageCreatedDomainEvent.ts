import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';
import { Image } from '../../domain/Image';

export class ImageCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string = 'andergi.backoffice.image.event.image_created.1';
	private constructor(private readonly id: string, private readonly path: string) {
		super({
			eventName: ImageCreatedDomainEvent.EVENT_NAME,
			aggregateId: id
		});
	}

	static fromAggregate(image: Image): ImageCreatedDomainEvent {
		return new ImageCreatedDomainEvent(image.getId(), image.getPath());
	}

	toPrimitives(): { id: string; path: string } {
		return {
			id: this.id,
			path: this.path
		};
	}
}
