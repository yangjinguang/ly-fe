export interface Role {
    id: number;
    roleId: string;
    name: string;
    description: string;
    tenantId: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}
