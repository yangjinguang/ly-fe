export interface Account {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    wxOpenId: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    tenantId: number;
    organizationId: number;
    roleId: number;
}
