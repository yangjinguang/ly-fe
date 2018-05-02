import {Account} from '../../pages/account/organization/models/account';
import {ApiResponse} from './api-response';

export interface OrganizationAccountListResponse extends ApiResponse {
    data: Account[];
}
