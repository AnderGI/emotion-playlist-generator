import { randomBytes } from 'crypto';
import fakerStatic from 'faker';

import SpotifyUser, {
	SpotifyUserPrimitives
} from '../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class SpotifyUserMother {
	static create(value?: SpotifyUserPrimitives): SpotifyUser {
		const name = fakerStatic.name.firstName();

		return SpotifyUser.fromPrimitives(
			Object.assign({}, value, {
				spotifyId: name,
				spotifyEmail: fakerStatic.internet.email(),
				spotifyDisplayName: name,
				country: fakerStatic.address.countryCode('ISO 3166-1 alpha-2'),
				refreshToken: randomBytes(64).toString('hex'),
				accessToken: randomBytes(64).toString('hex')
			})
		);
	}
}
