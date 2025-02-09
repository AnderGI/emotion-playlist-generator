import Command from '../../../../../shared/domain/command/Command';
import SpotifyUserReq from './SpotifyUserReq';

export default class LogInSpotifyUserCommand implements Command {
	constructor(readonly params: SpotifyUserReq) {}
}
