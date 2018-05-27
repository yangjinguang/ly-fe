import {ApiResponse} from './api-response';
import {Pagination} from './pagination';
import {Contact} from '../../pages/account/organization/models/contact';

export interface ContactListResponse extends ApiResponse {
    data: {
        list: Contact[];
        pagination: Pagination;
    };
}
