import {Organization} from './organization';

export interface OrganizationTree extends Organization {
    children: OrganizationTree[];
}
