import RegisterSpotifyUserCommand from '../application/registar/RegisterSpotifyUserCommand';

type SpotifyUserPrimitives = {
	id: string;
	country: string;
	displayName: string;
	email: string;
	ipAddress: string;
	accessToken: string;
	refreshToken: string;
};
export default class SpotifyUser {
	constructor(
		readonly id: string,
		readonly country: string,
		readonly displayName: string,
		readonly email: string,
		readonly ipAddress: string,
		readonly accessToken: string,
		readonly refreshToken: string
	) {}

	public static create(command: RegisterSpotifyUserCommand): SpotifyUser {
		const { id, country, displayName, email, ipAddress, accessToken, refreshToken } = command;

		return new SpotifyUser(id, country, displayName, email, ipAddress, accessToken, refreshToken);
	}

	public static fromPrimitives({
		id,
		country,
		displayName,
		email,
		ipAddress,
		accessToken,
		refreshToken
	}: SpotifyUserPrimitives): SpotifyUser {
		return new SpotifyUser(id, country, displayName, email, ipAddress, accessToken, refreshToken);
	}

	public toPrimitives(): SpotifyUserPrimitives {
		return {
			id: this.id,
			country: this.country,
			displayName: this.displayName,
			email: this.email,
			ipAddress: this.ipAddress,
			accessToken: this.accessToken,
			refreshToken: this.refreshToken
		};
	}
}
