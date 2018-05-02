import {Organization} from './organization';

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
    organizationIds: string[];
    organizations: Organization[];
    createdAt: Date;
    updatedAt: Date;
}
