import Command from '../../../../../shared/domain/command/Command';

type UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommandParams = {
	spotifyUserId: string;
	spotifyUserMail: string;
};
export default class UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommand implements Command {
	constructor(readonly params: UpdateEmotionSongRecommenderOnSpotifyUserLoggedInCommandParams) {}
}
