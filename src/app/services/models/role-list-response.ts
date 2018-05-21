import {ApiResponse} from './api-response';
import {Role} from '../../pages/account/role/models/role';
import {Pagination} from './pagination';

export interface RoleListResponse extends ApiResponse {
    data: {
        list: Role[];
        pagination: Pagination;
    };
}
