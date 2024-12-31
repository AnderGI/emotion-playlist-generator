import { EntitySchema } from 'typeorm';

import { UuidValueObject } from '../../../../../shared/domain/value-object/UuidValueObject';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import SpotifyUser from '../../../domain/SpotifyUser';
import SpotifyUserAccessToken from '../../../domain/SpotifyUserAccessToken';
import SpotifyUserCountryCode from '../../../domain/SpotifyUserCountryCode';
import SpotifyUserDisplayName from '../../../domain/SpotifyUserDisplayName';
import SpotifyUserEmail from '../../../domain/SpotifyUserEmail';
import SpotifyUserIpAddress from '../../../domain/SpotifyUserIpAddress';
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
		spotifyDisplayName: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserDisplayName)
		},
		spotifyUri: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserUri)
		},
		spotifyMail: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserEmail)
		},
		accessToken: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserAccessToken)
		},
		refreshToken: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserRefreshToken)
		},
		productType: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserProductType)
		},
		countryCode: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserCountryCode)
		},
		ipAddress: {
			type: String,
			transformer: ValueObjectTransformer(SpotifyUserIpAddress)
		}
	}
});
