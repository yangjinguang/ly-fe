import {Account} from '../../pages/account/organization/models/account';
import {ApiResponse} from './api-response';

export interface AccountListResponse extends ApiResponse{
    data: Account[];
}
