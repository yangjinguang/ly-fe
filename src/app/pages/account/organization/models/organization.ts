export interface Organization {
    id: number;
    organizationId: string;
    parentId: string;
    name: string;
    description: string;
    avatar: string;
    isRoot: boolean;
    isClass: boolean;
    enabled: boolean;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
    numberOfChildren: number;
    route: string[];
    children?: Organization[];
}
