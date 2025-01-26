export default interface SpotifyUserLoggedInDomainEventReq {
	aggregateId: string;
	spotify_id: string;
	spotify_email: string;
	spotify_display_name: string;
	spotify_product: string;
	spotify_uri: string;
	spotify_type: string;
	country: string;
	acces_token: string;
}
