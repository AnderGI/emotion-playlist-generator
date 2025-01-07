import { EntitySchema } from 'typeorm';

import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Image } from '../../../domain/Image';
import ImageDestination from '../../../domain/ImageDestination';
import { ImageFilename } from '../../../domain/ImageFilename';
import { ImageId } from '../../../domain/ImageId';
import ImageMimetype from '../../../domain/ImageMimetype';
import ImageSize from '../../../domain/ImageSize';

export const ImageEntity = new EntitySchema<Image>({
	name: 'Image',
	tableName: 'images',
	target: Image,
	columns: {
		id: {
			type: String,
			primary: true,
			transformer: ValueObjectTransformer(ImageId)
		},
		filename: {
			type: String,
			transformer: ValueObjectTransformer(ImageFilename)
		},
		destination: {
			type: String,
			transformer: ValueObjectTransformer(ImageDestination)
		},
		mimetype: {
			type: String,
			transformer: ValueObjectTransformer(ImageMimetype)
		},
		size: {
			type: Number,
			transformer: ValueObjectTransformer(ImageSize)
		}
	}
});
