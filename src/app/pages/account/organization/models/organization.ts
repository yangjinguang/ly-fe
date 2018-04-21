
export interface Organization {
    id: number;
    parentId: number;
    name: string;
    description: string;
    isClass: number;
    createdAt: Date;
    updatedAt: Date;
    tenantId: number;
    children?: Organization[];
}
