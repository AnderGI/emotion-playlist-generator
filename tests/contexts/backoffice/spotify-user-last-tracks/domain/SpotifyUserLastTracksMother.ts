import SpotifyUserLastTracks from '../../../../../src/contexts/backoffice/spotify-user-last-tracks/domain/SpotifyUserLastTracks';
import { UuidValueObject } from '../../../../../src/contexts/shared/domain/value-object/UuidValueObject';
import * as data from '../__mocks__/MockRetrieverResponse.json';

export class SpotifyUserLastTracksMother {
	static create(): SpotifyUserLastTracks {
		const tracks = data.items.map(item => {
			return JSON.stringify({
				album_id: item.album.id,
				album_name: item.album.name,
				album_release_date: item.album.release_date,
				artist_name: item.artists[0].name,
				playable: item.is_playable,
				track_name: item.name,
				track_popularity: item.popularity,
				track_url: item.external_urls.spotify
			});
		});

		return SpotifyUserLastTracks.fromPrimitives({
			userId: UuidValueObject.random(),
			updatedAt: new Date().getTime(),
			topTracks: tracks
		});
	}
}
