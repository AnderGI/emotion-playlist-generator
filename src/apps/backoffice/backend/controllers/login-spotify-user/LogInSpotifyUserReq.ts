import { Request } from 'express';

export default interface LogInSpotifyUserReq extends Request {
	spotifyDisplayName: string;
	spotifyUri: string;
	spotifyMail: string;
	accessToken: string;
	refreshToken: string;
	productType: string;
	countryCode: string;
	ipAddress: string;
}
