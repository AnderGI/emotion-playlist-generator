import { ControllerRequest } from '../../../../../shared/domain/ControllerRequest';

export default interface CreateSpotifyUserReq extends ControllerRequest {
	id: string;
	country: string;
	displayName: string;
	email: string;
}
