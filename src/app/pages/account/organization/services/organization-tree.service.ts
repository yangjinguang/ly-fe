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

    private orgTreeBuild(organizations: Organization[], orgTreeNode: NzTreeNode[]) {
        organizations.forEach(org => {
            const newNode = new NzTreeNode({
                title: org.name,
                key: org.id.toString()
            });
            orgTreeNode.push(newNode);
            if (org.children && org.children.length > 0) {
                newNode.children = [];
                this.orgTreeBuild(org.children, newNode.children);
            }
        });
    }

    public setOrgTree(organizations: Organization[]) {
        this.orgTree = [];
        this.orgTreeBuild(organizations, this.orgTree);
        this.subject.next(this.orgTree);
    }


    public orgTreeChanged() {
        return this.subject.asObservable();
    }

}
