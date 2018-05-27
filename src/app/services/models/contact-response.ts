import {ApiResponse} from './api-response';
import {Contact} from '../../pages/account/organization/models/contact';

export interface ContactResponse extends ApiResponse {
    data: Contact;
}
