import {Organization} from './organization';
import {ContactStatus} from '../enums/contactStatus';

export interface Contact {
    id: number;
    contactId: string;
    accountId: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    tenantId: number;
    isAdmin: boolean;
    status: ContactStatus;
    organizationIds: string[];
    organizations: Organization[];
    createdAt: Date;
    updatedAt: Date;
}
