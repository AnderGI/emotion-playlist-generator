type SpotifyUserPrimitives = {
	id: string;
	country: string;
	displayName: string;
	email: string;
};
export default class SpotifyUser {
	constructor(
		private readonly id: string,
		private readonly country: string,
		private readonly displayName: string,
		private readonly email: string
	) {}

	public static fromPrimitives({
		id,
		country,
		displayName,
		email
	}: SpotifyUserPrimitives): SpotifyUser {
		return new SpotifyUser(id, country, displayName, email);
	}

	public toPrimitives(): SpotifyUserPrimitives {
		return {
			id: this.id,
			country: this.country,
			displayName: this.displayName,
			email: this.email
		};
	}
}
