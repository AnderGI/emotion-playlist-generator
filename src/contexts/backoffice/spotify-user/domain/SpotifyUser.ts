/* eslint-disable camelcase */
import LogInSpotifyUserCommand from '../../../../apps/backoffice/backend/controllers/login-spotify-user/LogInSpotifyUserCommand';
import { UuidValueObject } from '../../../shared/domain/value-object/UuidValueObject';
import SpotifyId from './SpotifyId';
import SpotifyType from './SpotifyType';
import SpotifyUserCountryCode from './SpotifyUserCountryCode';
import SpotifyUserDisplayName from './SpotifyUserDisplayName';
import SpotifyUserEmail from './SpotifyUserEmail';
import SpotifyUserProductType from './SpotifyUserProductType';
import SpotifyUserRefreshToken from './SpotifyUserRefreshToken';
import SpotifyUserUri from './SpotifyUserUri';

export type SpotifyUserPrimitives = {
	uuid: string;
	spotify_id: string;
	spotify_email: string;
	spotify_display_name: string;
	spotify_product: string;
	spotify_uri: string;
	spotify_type: string;
	country: string;
	refresh_token: string;
};

export default class SpotifyUser {
	constructor(
		readonly id: UuidValueObject,
		readonly spotifyId: SpotifyId,
		readonly spotifyMail: SpotifyUserEmail,
		readonly spotifyDisplayName: SpotifyUserDisplayName,
		readonly productType: SpotifyUserProductType,
		readonly spotifyUri: SpotifyUserUri,
		readonly spotifyType: SpotifyType,
		readonly countryCode: SpotifyUserCountryCode,
		readonly refreshToken: SpotifyUserRefreshToken
	) {}

	public static create(command: LogInSpotifyUserCommand): SpotifyUser {
		const {
			uuid,
			spotify_id,
			spotify_email,
			spotify_display_name,
			spotify_product,
			spotify_uri,
			spotify_type,
			country,
			refresh_token
		} = command.params;

		return new SpotifyUser(
			new UuidValueObject(uuid),
			new SpotifyId(spotify_id),
			new SpotifyUserEmail(spotify_email),
			new SpotifyUserDisplayName(spotify_display_name),
			new SpotifyUserProductType(spotify_product),
			new SpotifyUserUri(spotify_uri),
			new SpotifyType(spotify_type),
			new SpotifyUserCountryCode(country),
			new SpotifyUserRefreshToken(refresh_token)
		);
	}

	public static fromPrimitives({
		uuid,
		spotify_id,
		spotify_email,
		spotify_display_name,
		spotify_product,
		spotify_uri,
		spotify_type,
		country,
		refresh_token
	}: SpotifyUserPrimitives): SpotifyUser {
		return new SpotifyUser(
			new UuidValueObject(uuid),
			new SpotifyId(spotify_id),
			new SpotifyUserEmail(spotify_email),
			new SpotifyUserDisplayName(spotify_display_name),
			new SpotifyUserProductType(spotify_product),
			new SpotifyUserUri(spotify_uri),
			new SpotifyType(spotify_type),
			new SpotifyUserCountryCode(country),
			new SpotifyUserRefreshToken(refresh_token)
		);
	}

	public toPrimitives(): SpotifyUserPrimitives {
		return {
			uuid: this.id.value,
			spotify_id: this.spotifyId.value,
			spotify_email: this.spotifyMail.value,
			spotify_display_name: this.spotifyDisplayName.value,
			spotify_product: this.productType.value,
			spotify_uri: this.spotifyUri.value,
			spotify_type: this.spotifyType.value,
			country: this.countryCode.value,
			refresh_token: this.refreshToken.value
		};
	}
}
