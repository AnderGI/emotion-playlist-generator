import * as faker from 'faker';

import SpotifyUser from '../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUser';

export class SpotifyUserMother {
	static random(): SpotifyUser {
		return SpotifyUser.fromPrimitives({
			id: faker.internet.userName(),
			country: faker.address.countryCode('ISO 3166-1 alpha-2'),
			displayName: faker.internet.userName(),
			email: faker.internet.email()
		});
	}
}
