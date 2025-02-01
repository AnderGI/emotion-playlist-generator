import { EntitySchema } from 'typeorm';

import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Image } from '../../../domain/Image';
import { ImageDirname } from '../../../domain/ImageDirname';
import { ImageFilename } from '../../../domain/ImageFilename';
import { ImageId } from '../../../domain/ImageId';

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
		dirname: {
			type: String,
			transformer: ValueObjectTransformer(ImageDirname)
		}
	}
});
