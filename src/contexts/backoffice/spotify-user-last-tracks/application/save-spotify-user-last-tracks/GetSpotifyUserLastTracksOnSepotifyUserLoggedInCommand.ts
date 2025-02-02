import Command from '../../../../../shared/domain/command/Command';

export type GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandData = {
	spotifyEmail: string;
	spotifyDisplayName: string;
	country: string;
	accessToken: string;
	aggregateId: string;
};

export default class GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand implements Command {
	constructor(readonly data: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandData) {}
}
