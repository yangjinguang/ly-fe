import {ApiResponse} from './api-response';
import {Role} from '../../pages/account/role/models/role';

export interface RoleResponse extends ApiResponse {
    data: Role;
}
