import {Tenant} from './tenant';
import {ApiResponse} from './api-response';

export interface TenantListResponse extends ApiResponse {
    data: Tenant[];
}
