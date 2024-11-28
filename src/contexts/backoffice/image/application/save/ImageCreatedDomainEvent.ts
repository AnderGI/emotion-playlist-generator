import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';
import { Image } from '../../domain/Image';

export class ImageCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME: string = 'andergi.backoffice.image.event.image_created.1';
	private readonly path: string;
	private constructor({ id, path }: { id: string; path: string }) {
		super({
			eventName: ImageCreatedDomainEvent.EVENT_NAME,
			aggregateId: id
		});
		this.path = path;
	}

	static fromAggregate(image: Image): ImageCreatedDomainEvent {
		return new ImageCreatedDomainEvent({ id: image.getId(), path: image.getPath() });
	}

	toPrimitives(): { path: string } {
		return {
			path: this.path
		};
	}
}
