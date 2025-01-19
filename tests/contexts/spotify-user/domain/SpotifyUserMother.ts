import { randomBytes } from 'crypto';
import fakerStatic from 'faker';

import SpotifyUser, {
	SpotifyUserPrimitives
} from '../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class SpotifyUserMother {
	static create(value?: SpotifyUserPrimitives): SpotifyUser {
		const name = fakerStatic.name.firstName();

		return SpotifyUser.fromPrimitives(
			Object.assign({}, value, {
				uuid: fakerStatic.datatype.uuid(),
				spotify_id: name,
				spotify_email: fakerStatic.internet.email(),
				spotify_display_name: name,
				spotify_product: fakerStatic.random.arrayElement(['premium', 'free']),
				spotify_uri: `spotify:user:${name}`,
				spotify_type: fakerStatic.random.arrayElement(['user']),
				country: fakerStatic.address.countryCode('ISO 3166-1 alpha-2'),
				refresh_token: randomBytes(64).toString('hex')
			})
		);
	}
}
