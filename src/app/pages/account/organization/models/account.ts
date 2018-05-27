import {Organization} from './organization';
import {ContactStatus} from '../enums/contactStatus';

export interface Account {
    id: number;
    accountId: string;
    username: string;
    // name: string;
    email: string;
    phone: string;
    wxOpenId: string;
    avatar: string;
    // tenantId: number;
    // isAdmin: boolean;
    // status: ContactStatus;
    // organizationIds: string[];
    // organizations: Organization[];
    createdAt: Date;
    updatedAt: Date;
}
