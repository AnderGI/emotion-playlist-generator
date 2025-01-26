import Command from '../../../../../shared/domain/command/Command';

export type GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandData = {
	spotify_id: string;
	spotify_email: string;
	spotify_display_name: string;
	spotify_product: string;
	spotify_uri: string;
	spotify_type: string;
	country: string;
	access_token: string;
	aggregateId: string;
};

export default class GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommand implements Command {
	constructor(readonly data: GetSpotifyUserLastTracksOnSepotifyUserLoggedInCommandData) {}
}
