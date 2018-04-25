import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {NzTreeNode} from 'ng-zorro-antd';
import {Organization} from '../models/organization';

@Injectable()
export class OrganizationTreeService {
    private orgTree: NzTreeNode[];
    private subject: Subject<NzTreeNode[]>;

    constructor() {
        this.subject = new Subject<NzTreeNode[]>();
    }

    public getOrgTree() {
        return this.orgTree;
    }

    private orgTreeBuild(organizations: Organization[], orgTreeNode: NzTreeNode) {
        organizations.forEach(org => {
            const newNode = new NzTreeNode({
                title: org.name,
                key: org.id.toString()
            });
            newNode.origin = org;
            newNode.isLeaf = !org.children || org.children.length <= 0;
            newNode.parentNode = orgTreeNode;
            // newNode.nzShowExpand = !newNode.isLeaf;
            orgTreeNode.children = orgTreeNode.children || [];
            orgTreeNode.children.push(newNode);
            if (org.children && org.children.length > 0) {
                this.orgTreeBuild(org.children, newNode);
            }
        });
    }

    public setOrgTree(organizations: Organization[]) {
        const rootNode = new NzTreeNode({
            title: '全公司',
            key: '0'
        });
        rootNode.isExpanded = true;
        rootNode.isSelected = true;
        this.orgTree = [rootNode];
        this.orgTreeBuild(organizations, rootNode);
        this.subject.next(this.orgTree);
    }


    public orgTreeChanged() {
        return this.subject.asObservable();
    }

}
