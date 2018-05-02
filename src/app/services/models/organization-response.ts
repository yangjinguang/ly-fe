import {Organization} from '../../pages/account/organization/models/organization';
import {ApiResponse} from './api-response';

export interface OrganizationResponse extends ApiResponse {
    data: Organization;
}
