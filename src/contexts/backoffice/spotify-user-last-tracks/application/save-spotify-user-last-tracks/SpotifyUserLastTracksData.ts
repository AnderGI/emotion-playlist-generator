export interface External_urls {
	spotify: string;
}

export interface Images {
	height: number;
	url: string;
	width: number;
}

export interface External_ids {
	isrc: string;
}
export interface Artists {
	external_urls: External_urls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface Album {
	album_type: string;
	artists: Artists[];
	available_markets: string[];
	external_urls: External_urls;
	href: string;
	id: string;
	images: Images[];
	is_playable: boolean;
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}
export interface Items {
	album: Album;
	artists: Artists[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: External_ids;
	external_urls: External_urls;
	href: string;
	id: string;
	is_local: boolean;
	is_playable: boolean;
	name: string;
	popularity: number;
	preview_url: null;
	track_number: number;
	type: string;
	uri: string;
}
export interface SpotifyUserLastTracksData {
	items: Items[];
	total: number;
	limit: number;
	offset: number;
	href: string;
	next: string;
	previous: null;
}
