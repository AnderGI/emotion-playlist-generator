import Command from '../../../../../shared/domain/command/Command';

type LogInSpotifyUserCommandParams = {
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

export default class LogInSpotifyUserCommand implements Command {
	constructor(readonly params: LogInSpotifyUserCommandParams) {}
}
