
export interface Organization {
    id: number;
    parentId: number;
    name: string;
    address: string;
    description: string;
    isClass: number;
    createdAt: Date;
    updatedAt: Date;
    tenantId: number;
    children?: Organization[];
}
