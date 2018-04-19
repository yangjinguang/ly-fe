import {Organization} from './organization';
import {NzTreeNode} from 'ng-zorro-antd';

export interface OrganizationTree extends Organization, NzTreeNode {
    children: OrganizationTree[];
}
