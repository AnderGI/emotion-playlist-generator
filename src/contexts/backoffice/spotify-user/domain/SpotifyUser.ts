import LogInSpotifyUserCommand from '../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import { UuidValueObject } from '../../../shared/domain/value-object/UuidValueObject';
import SpotifyUserAccessToken from './SpotifyUserAccessToken';
import SpotifyUserCountryCode from './SpotifyUserCountryCode';
import SpotifyUserDisplayName from './SpotifyUserDisplayName';
import SpotifyUserEmail from './SpotifyUserEmail';
import SpotifyUserIpAddress from './SpotifyUserIpAddress';
import SpotifyUserProductType from './SpotifyUserProductType';
import SpotifyUserRefreshToken from './SpotifyUserRefreshToken';
import SpotifyUserUri from './SpotifyUserUri';

export type SpotifyUserPrimitives = {
	id: string;
	spotifyDisplayName: string;
	spotifyUri: string;
	spotifyMail: string;
	accessToken: string;
	refreshToken: string;
	productType: string;
	countryCode: string;
	ipAddress: string;
};

// type SpotifyUserParams = {
// 	id: UuidValueObject;
// 	spotifyDisplayName: SpotifyUserDisplayName;
// 	spotifyUri: SpotifyUserUri;
// 	spotifyMail: SpotifyUserEmail;
// 	accessToken: SpotifyUserAccessToken;
// 	refreshToken: SpotifyUserRefreshToken;
// 	productType: SpotifyUserProductType;
// 	countryCode: SpotifyUserCountryCode;
// 	ipAddress: SpotifyUserIpAddress;
// };
export default class SpotifyUser {
	constructor(
		readonly id: UuidValueObject,
		readonly spotifyDisplayName: SpotifyUserDisplayName,
		readonly spotifyUri: SpotifyUserUri,
		readonly spotifyMail: SpotifyUserEmail,
		readonly accessToken: SpotifyUserAccessToken,
		readonly refreshToken: SpotifyUserRefreshToken,
		readonly productType: SpotifyUserProductType,
		readonly countryCode: SpotifyUserCountryCode,
		readonly ipAddress: SpotifyUserIpAddress
	) {}

	public static create(command: LogInSpotifyUserCommand): SpotifyUser {
		const {
			id,
			spotifyDisplayName,
			spotifyUri,
			spotifyMail,
			accessToken,
			refreshToken,
			productType,
			countryCode,
			ipAddress
		} = command.params;

		return new SpotifyUser(
			new UuidValueObject(id),
			new SpotifyUserDisplayName(spotifyDisplayName),
			new SpotifyUserUri(spotifyUri),
			new SpotifyUserEmail(spotifyMail),
			new SpotifyUserAccessToken(accessToken),
			new SpotifyUserRefreshToken(refreshToken),
			new SpotifyUserProductType(productType),
			new SpotifyUserCountryCode(countryCode),
			new SpotifyUserIpAddress(ipAddress)
		);
	}

	public static fromPrimitives({
		id,
		spotifyDisplayName,
		spotifyUri,
		spotifyMail,
		accessToken,
		refreshToken,
		productType,
		countryCode,
		ipAddress
	}: SpotifyUserPrimitives): SpotifyUser {
		return new SpotifyUser(
			new UuidValueObject(id),
			new SpotifyUserDisplayName(spotifyDisplayName),
			new SpotifyUserUri(spotifyUri),
			new SpotifyUserEmail(spotifyMail),
			new SpotifyUserAccessToken(accessToken),
			new SpotifyUserRefreshToken(refreshToken),
			new SpotifyUserProductType(productType),
			new SpotifyUserCountryCode(countryCode),
			new SpotifyUserIpAddress(ipAddress)
		);
	}

	public toPrimitives(): SpotifyUserPrimitives {
		return {
			id: this.id.value,
			spotifyDisplayName: this.spotifyDisplayName.value,
			spotifyUri: this.spotifyUri.value,
			spotifyMail: this.spotifyMail.value,
			accessToken: this.accessToken.value,
			refreshToken: this.refreshToken.value,
			productType: this.productType.value,
			countryCode: this.countryCode.value,
			ipAddress: this.ipAddress.value
		};
	}
}
