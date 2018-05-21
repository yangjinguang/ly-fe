import {Organization} from './organization';
import {AccountStatus} from '../enums/account.status';

export interface Account {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    wxOpenId: string;
    avatar: string;
    tenantId: number;
    isAdmin: boolean;
    status: AccountStatus;
    organizationIds: string[];
    organizations: Organization[];
    createdAt: Date;
    updatedAt: Date;
}
