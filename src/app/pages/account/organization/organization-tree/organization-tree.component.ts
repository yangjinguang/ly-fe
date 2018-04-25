import {Component, OnInit} from '@angular/core';
import {NzFormatEmitEvent, NzMessageService, NzModalRef, NzModalService, NzTreeNode} from 'ng-zorro-antd';
import {OrganizationApiService} from '../../../../services/organization-api.service';
import {OrganizationTreeService} from '../services/organization-tree.service';
import {Router} from '@angular/router';
import {Organization} from '../models/organization';
import {OrganizationCreateModalComponent} from '../components/organization-create-modal/organization-create-modal.component';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-organization-tree',
    templateUrl: './organization-tree.component.html',
    styleUrls: ['./organization-tree.component.scss'],
    providers: [OrganizationApiService]
})
export class OrganizationTreeComponent implements OnInit {
    public orgTree: NzTreeNode[];
    public curTreeNode: NzTreeNode;

    constructor(private organizationApi: OrganizationApiService,
                private orgTreeService: OrganizationTreeService,
                private router: Router,
                private modalService: NzModalService,
                private message: NzMessageService) {
    }

    ngOnInit() {
        this.orgTreeService.orgTreeChanged().subscribe(result => {
            this.orgTree = result;
            console.log(this.orgTree);
        });
        this.getOrgTree();
    }

    private getOrgTree() {
        this.organizationApi.tree().subscribe(result => {
            const organizations = result.data.children;
            this.orgTreeService.setOrgTree(organizations);
        });
    }

    public orgItemClick(e: NzFormatEmitEvent) {
        console.log(e.node.origin);
        e.node.isSelected = true;
        this.curTreeNode = e.node;
        // this.router.navigate(['list/' + e.node.key], {relativeTo: this.route});
    }

    public openOrganizationCreateModal() {
        const modal = this.modalService.create({
            nzTitle: '创建组织',
            nzContent: OrganizationCreateModalComponent,
            nzComponentParams: {
                parentOrganization: this.curTreeNode && this.curTreeNode.origin || null
            },
            nzFooter: [
                {
                    label: '取消',
                    type: 'default',
                    onClick: () => {
                        modal.close();
                    }
                },
                {
                    label: '确定',
                    type: 'primary',
                    onClick: (a) => {
                        this.createOrganization(a.orgForm, modal);
                    }
                }
            ]
        });
    }

    private createOrganization(orgForm: FormGroup, modal: NzModalRef) {
        const postData = {
            parentId: orgForm.get('parentId').value,
            name: orgForm.get('name').value,
            description: orgForm.get('description').value,
            isClass: orgForm.get('isClass').value
        };
        this.organizationApi.create(postData).subscribe(result => {
            console.log(result);
            modal.close();
            if (postData.parentId === this.curTreeNode.origin.organizationId) {
                const newNode = new NzTreeNode({
                    title: result.data.name,
                    key: result.data.id.toString()
                });
                newNode.origin = result.data;
                this.curTreeNode.children.push(newNode);
            } else {
                this.getOrgTree();
            }
            this.message.success('创建成功');
            // this.router.navigate(['../'], {relativeTo: this.route});
        });
    }

}
