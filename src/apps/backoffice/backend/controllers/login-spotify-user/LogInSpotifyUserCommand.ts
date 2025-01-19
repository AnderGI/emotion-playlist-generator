import Command from '../../../../../shared/domain/command/Command';
import SpotifyUserData from './SpotifyUserData';

export default class LogInSpotifyUserCommand implements Command {
	constructor(readonly params: SpotifyUserData) {}
}
