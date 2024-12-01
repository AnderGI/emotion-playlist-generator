import { EntitySchema } from 'typeorm';

import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Image } from '../../../domain/Image';
import { ImageId } from '../../../domain/ImageId';
import { ImagePath } from '../../../domain/ImagePath';

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
		path: {
			type: String,
			transformer: ValueObjectTransformer(ImagePath)
		}
	}
});