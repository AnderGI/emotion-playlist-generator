import LogInSpotifyUserCommand from '../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import SpotifyId from './SpotifyId';
import SpotifyUserAccessToken from './SpotifyUserAccessToken';
import SpotifyUserCountryCode from './SpotifyUserCountryCode';
import SpotifyUserDisplayName from './SpotifyUserDisplayName';
import SpotifyUserEmail from './SpotifyUserEmail';
import SpotifyUserRefreshToken from './SpotifyUserRefreshToken';

export type SpotifyUserPrimitives = {
	spotifyId: string;
	spotifyEmail: string;
	spotifyDisplayName: string;
	country: string;
	refreshToken: string;
	accessToken: string;
};

export default class SpotifyUser {
	constructor(
		readonly spotifyId: SpotifyId,
		readonly spotifyMail: SpotifyUserEmail,
		readonly spotifyDisplayName: SpotifyUserDisplayName,
		readonly countryCode: SpotifyUserCountryCode,
		readonly refreshToken: SpotifyUserRefreshToken,
		readonly accessToken: SpotifyUserAccessToken
	) {}

	public static create(command: LogInSpotifyUserCommand): SpotifyUser {
		const { spotifyId, spotifyEmail, spotifyDisplayName, country, refreshToken, accessToken } =
			command.params;

		return new SpotifyUser(
			new SpotifyId(spotifyId),
			new SpotifyUserEmail(spotifyEmail),
			new SpotifyUserDisplayName(spotifyDisplayName),
			new SpotifyUserCountryCode(country),
			new SpotifyUserRefreshToken(refreshToken),
			new SpotifyUserAccessToken(accessToken)
		);
	}

	public static fromPrimitives({
		spotifyId,
		spotifyEmail,
		spotifyDisplayName,
		country,
		refreshToken,
		accessToken
	}: SpotifyUserPrimitives): SpotifyUser {
		return new SpotifyUser(
			new SpotifyId(spotifyId),
			new SpotifyUserEmail(spotifyEmail),
			new SpotifyUserDisplayName(spotifyDisplayName),
			new SpotifyUserCountryCode(country),
			new SpotifyUserRefreshToken(refreshToken),
			new SpotifyUserAccessToken(accessToken)
		);
	}

	public toPrimitives(): SpotifyUserPrimitives {
		return {
			spotifyId: this.spotifyId.value,
			spotifyEmail: this.spotifyMail.value,
			spotifyDisplayName: this.spotifyDisplayName.value,
			country: this.countryCode.value,
			refreshToken: this.refreshToken.value,
			accessToken: this.accessToken.value
		};
	}
}
