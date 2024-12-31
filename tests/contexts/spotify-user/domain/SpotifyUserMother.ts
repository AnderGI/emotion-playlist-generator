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
				id: fakerStatic.datatype.uuid(),
				spotifyDisplayName: name,
				spotifyUri: `spotify:user:${name}`,
				spotifyMail: fakerStatic.internet.email(),
				accessToken: randomBytes(32).toString('hex'),
				refreshToken: randomBytes(64).toString('hex'),
				productType: fakerStatic.random.arrayElement(['premium', 'free']),
				countryCode: fakerStatic.address.countryCode('ISO 3166-1 alpha-2'),
				ipAddress: fakerStatic.internet.ip()
			})
		);
	}
}
