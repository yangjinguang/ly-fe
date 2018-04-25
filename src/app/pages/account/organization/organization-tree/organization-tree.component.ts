import {Component, OnInit} from '@angular/core';
import {NzFormatEmitEvent, NzMessageService, NzModalRef, NzModalService, NzTreeNode} from 'ng-zorro-antd';
import {OrganizationApiService} from '../../../../services/organization-api.service';
import {OrganizationTreeService} from '../services/organization-tree.service';
import {Router} from '@angular/router';
import {OrganizationCreateModalComponent} from '../components/organization-create-modal/organization-create-modal.component';
import {FormGroup} from '@angular/forms';
import {OrganizationAccountCreateModalComponent} from '../components/organization-account-create-modal/organization-account-create-modal.component';

@Component({
    selector: 'app-organization-tree',
    templateUrl: './organization-tree.component.html',
    styleUrls: ['./organization-tree.component.scss'],
    providers: [OrganizationApiService]
})
export class OrganizationTreeComponent implements OnInit {
    public orgTree: NzTreeNode[];
    public curTreeNode: NzTreeNode;
    private dragNodeParent: NzTreeNode;

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
        e.node.isSelected = true;
        this.curTreeNode = e.node;
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
        });
    }

    public openCreateAccountModal() {
        const modal = this.modalService.create({
            nzTitle: '添加员工',
            nzContent: OrganizationAccountCreateModalComponent,
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
                    disabled: (a) => a.accountForm.invalid,
                    onClick: (a) => {
                        this.createAccount(a.accountForm, modal);
                    }
                }
            ]
        });
    }

    public createAccount(accountForm: FormGroup, modal: NzModalRef) {
        const postData = {
            username: accountForm.get('username').value,
            name: accountForm.get('name').value,
            email: accountForm.get('email').value,
            phone: accountForm.get('phone').value,
            isAdmin: accountForm.get('isAdmin').value
        };
        console.log(postData);
        // TODO API
        modal.close();
        this.message.success('添加成功');
    }

    public deleteOrganization() {
        this.modalService.confirm({
            nzTitle: '确定要删除此部门吗？',
            nzOnOk: (a) => {
                console.log(this.curTreeNode);
                // TODO API
                const parentNode = this.curTreeNode.getParentNode();
                console.log(parentNode);
                const index = parentNode.children.findIndex(n => n.key === this.curTreeNode.key);
                parentNode.children.splice(index, 1);
            }
        });
    }

    public orgDragStart(e) {
        this.dragNodeParent = e.dragNode.getParentNode();
    }

    public orgDrop(e) {
        const dragNode = e.dragNode;
        if (this.dragNodeParent && this.dragNodeParent.children.length <= 0) {
            this.dragNodeParent.isLeaf = true;
        }
        const dropNode = e.node;
        // TODO 调API改变排序和父节点
    }

}
