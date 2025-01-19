import { EntitySchema } from 'typeorm';

import { UuidValueObject } from '../../../../../shared/domain/value-object/UuidValueObject';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import SpotifyId from '../../../domain/SpotifyId';
import SpotifyType from '../../../domain/SpotifyType';
import SpotifyUser from '../../../domain/SpotifyUser';
import SpotifyUserCountryCode from '../../../domain/SpotifyUserCountryCode';
import SpotifyUserDisplayName from '../../../domain/SpotifyUserDisplayName';
import SpotifyUserEmail from '../../../domain/SpotifyUserEmail';
import SpotifyUserProductType from '../../../domain/SpotifyUserProductType';
import SpotifyUserRefreshToken from '../../../domain/SpotifyUserRefreshToken';
import SpotifyUserUri from '../../../domain/SpotifyUserUri';

export const ImageEntity = new EntitySchema<SpotifyUser>({
	name: 'SpotifyUser',
	tableName: 'spotify_users',
	target: SpotifyUser,
	columns: {
		id: {
			type: String,
			primary: true,
			transformer: ValueObjectTransformer(UuidValueObject)
		},
		spotifyId: {
			type: String,
			primary: true,
			transformer: ValueObjectTransformer(SpotifyId)
		},
		spotifyMail: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserEmail)
		},
		spotifyDisplayName: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserDisplayName)
		},
		productType: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserProductType)
		},
		spotifyUri: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserUri)
		},
		spotifyType: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyType)
		},
		countryCode: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserCountryCode)
		},
		refreshToken: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserRefreshToken)
		}
	}
});
