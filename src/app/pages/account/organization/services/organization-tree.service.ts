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
            // newNode.isLeaf = org.numberOfChildren <= 0;
            newNode.parentNode = orgTreeNode;
            // newNode.nzShowExpand = !newNode.isLeaf;
            orgTreeNode.children = orgTreeNode.children || [];
            orgTreeNode.children.push(newNode);
            if (org.children && org.children.length > 0) {
                this.orgTreeBuild(org.children, newNode);
            }
        });
    }

    public setOrgTree(organization: Organization) {
        const rootNode = new NzTreeNode({
            title: organization.name,
            key: organization.id.toString()
        });
        rootNode.isExpanded = true;
        rootNode.isSelected = true;
        rootNode.origin = organization;
        this.orgTree = [rootNode];
        this.orgTreeBuild(organization.children, rootNode);
        this.subject.next(this.orgTree);
    }

    public setChildren(orgTreeNode: NzTreeNode, organizations: Organization[]) {
        const children: NzTreeNode[] = [];
        organizations.forEach(org => {
            const newNode = new NzTreeNode({
                title: org.name,
                key: org.id.toString()
            });
            newNode.origin = org;
            // newNode.isLeaf = org.numberOfChildren <= 0;
            newNode.parentNode = orgTreeNode;
            children.push(newNode);
        });
        orgTreeNode.children = children;
    }


    public orgTreeChanged() {
        return this.subject.asObservable();
    }

}
