import Command from '../../../../../shared/domain/command/Command';

export default class CreateSpotifyUserCommand implements Command {
	constructor(
		readonly id: string,
		readonly country: string,
		readonly displayName: string,
		readonly email: string
	) {}
}
