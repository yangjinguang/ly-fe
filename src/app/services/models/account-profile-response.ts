import {Account} from '../../pages/account/organization/models/account';
import {ApiResponse} from './api-response';

export interface AccountProfileResponse extends ApiResponse {
    data: Account;
}
