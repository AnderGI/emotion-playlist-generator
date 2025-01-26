import { SpotifyUserRepository } from '../../../../../../src/contexts/backoffice/spotify-user/domain/SpotifyUserRepository';
import { EnvironmentArranger } from '../../../../shared/infrastructure/arranger/EnvironmentArranger';
import { SpotifyUserMother } from '../../domain/SpotifyUserMother';

export default class SpotifyUserRepositoryArrenger {
	constructor(
		private readonly repository: SpotifyUserRepository,
		private readonly environmentArranger: EnvironmentArranger
	) {}

	public async saveSpotifyUser(): Promise<void> {
		await this.cleanFirst();
		const spotifyUser = SpotifyUserMother.create();
		await this.repository.save(spotifyUser);
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
