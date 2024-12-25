export default class RegisterSpotifyUserCommand {
	constructor(
		readonly id: string,
		readonly country: string,
		readonly displayName: string,
		readonly email: string
	) {}
}
