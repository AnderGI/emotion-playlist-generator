export default class EmotionSongRecommender {
	constructor(
		readonly spotifyUserId: string,
		public spotifyUserMail: string | null,
		public lastTracks: string | null
	) {}
}
