import { EntitySchema } from 'typeorm';

import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import SpotifyId from '../../../domain/SpotifyId';
import SpotifyUser from '../../../domain/SpotifyUser';
import SpotifyUserCountryCode from '../../../domain/SpotifyUserCountryCode';
import SpotifyUserDisplayName from '../../../domain/SpotifyUserDisplayName';
import SpotifyUserEmail from '../../../domain/SpotifyUserEmail';
import SpotifyUserRefreshToken from '../../../domain/SpotifyUserRefreshToken';

export const SpotifyUserEntity = new EntitySchema<SpotifyUser>({
	name: 'SpotifyUser',
	tableName: 'spotify_users',
	target: SpotifyUser,
	columns: {
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
