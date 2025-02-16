import LogInSpotifyUserCommand from '../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import SpotifyId from './SpotifyId';
import SpotifyUserCountryCode from './SpotifyUserCountryCode';
import SpotifyUserDisplayName from './SpotifyUserDisplayName';
import SpotifyUserEmail from './SpotifyUserEmail';

export type SpotifyUserPrimitives = {
	spotifyId: string;
	spotifyEmail: string;
	spotifyDisplayName: string;
	country: string;
};

export default class SpotifyUser {
	constructor(
		readonly spotifyId: SpotifyId,
		readonly spotifyMail: SpotifyUserEmail,
		readonly spotifyDisplayName: SpotifyUserDisplayName,
		readonly countryCode: SpotifyUserCountryCode
	) {}

	public static create(command: LogInSpotifyUserCommand): SpotifyUser {
		const { spotifyId, spotifyEmail, spotifyDisplayName, country } = command.params;

		return new SpotifyUser(
			new SpotifyId(spotifyId),
			new SpotifyUserEmail(spotifyEmail),
			new SpotifyUserDisplayName(spotifyDisplayName),
			new SpotifyUserCountryCode(country)
		);
	}

	public static fromPrimitives({
		spotifyId,
		spotifyEmail,
		spotifyDisplayName,
		country
	}: SpotifyUserPrimitives): SpotifyUser {
		return new SpotifyUser(
			new SpotifyId(spotifyId),
			new SpotifyUserEmail(spotifyEmail),
			new SpotifyUserDisplayName(spotifyDisplayName),
			new SpotifyUserCountryCode(country)
		);
	}

	public toPrimitives(): SpotifyUserPrimitives {
		return {
			spotifyId: this.spotifyId.value,
			spotifyEmail: this.spotifyMail.value,
			spotifyDisplayName: this.spotifyDisplayName.value,
			country: this.countryCode.value
		};
	}
}
