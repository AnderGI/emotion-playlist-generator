import Command from '../../../../../shared/domain/command/Command';

type UpdateEmotionSongRecommenderOnSpotifyUserLastTracksUpdatedCommandParams = {
	spotifyUserId: string;
	lastTracks: string;
};
export default class UpdateEmotionSongRecommenderOnSpotifyUserLastTracksUpdatedCommand
	implements Command
{
	constructor(
		readonly params: UpdateEmotionSongRecommenderOnSpotifyUserLastTracksUpdatedCommandParams
	) {}
}
