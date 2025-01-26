import SpotifyUserLastTracksRepository from '../../../../../../src/contexts/backoffice/spotify-user-last-tracks/domain/SpotifyUserLastTracksRepository';
import { EnvironmentArranger } from '../../../../shared/infrastructure/arranger/EnvironmentArranger';
import { SpotifyUserLastTracksMother } from '../../domain/SpotifyUserLastTracksMother';

export default class SpotifyUserLastTracksRepositoryArrenger {
	constructor(
		private readonly repository: SpotifyUserLastTracksRepository,
		private readonly environmentArranger: EnvironmentArranger
	) {}

	public async saveSpotifyUser(): Promise<void> {
		await this.cleanFirst();
		const spotifyUserLastTracks = SpotifyUserLastTracksMother.create();
		await this.repository.save(spotifyUserLastTracks);
		await this.cleanEnd();
	}

	private async cleanFirst(): Promise<void> {
		await this.environmentArranger.clean();
	}

	private async cleanEnd(): Promise<void> {
		await this.environmentArranger.clean();
		await this.environmentArranger.close();
	}
}
