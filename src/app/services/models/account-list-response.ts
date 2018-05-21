import {Account} from '../../pages/account/organization/models/account';
import {ApiResponse} from './api-response';
import {Pagination} from './pagination';

export interface AccountListResponse extends ApiResponse {
    data: {
        list: Account[];
        pagination: Pagination;
    };
}
