import Command from '../../../../../shared/domain/command/Command';

export default class RegisterSpotifyUserCommand implements Command {
	constructor(
		readonly id: string,
		readonly country: string,
		readonly displayName: string,
		readonly email: string,
		readonly spotifyUserAccesToken: string
	) {}
}
