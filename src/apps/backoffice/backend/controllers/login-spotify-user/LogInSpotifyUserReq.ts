export default interface LogInSpotifyUserReq {
	id: string;
	spotifyDisplayName: string;
	spotifyUri: string;
	spotifyMail: string;
	accessToken: string;
	refreshToken: string;
	productType: string;
	countryCode: string;
	ipAddress: string;
}
