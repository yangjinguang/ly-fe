import {Component, OnInit} from '@angular/core';
import {NzFormatEmitEvent, NzMessageService, NzModalRef, NzModalService, NzTreeNode} from 'ng-zorro-antd';
import {OrganizationApiService} from '../../../../services/organization-api.service';
import {OrganizationTreeService} from '../services/organization-tree.service';
import {Router} from '@angular/router';
import {OrganizationCreateModalComponent} from '../components/organization-create-modal/organization-create-modal.component';
import {FormGroup} from '@angular/forms';
import {OrganizationAccountCreateModalComponent} from '../components/organization-account-create-modal/organization-account-create-modal.component';
import {AccountApiService} from '../../../../services/account-api.service';
import {Organization} from '../models/organization';
import {Account} from '../models/account';

@Component({
    selector: 'app-organization-tree',
    templateUrl: './organization-tree.component.html',
    styleUrls: ['./organization-tree.component.scss'],
    providers: [OrganizationApiService, AccountApiService]
})
export class OrganizationTreeComponent implements OnInit {
    public orgTree: NzTreeNode[];
    public curTreeNode: NzTreeNode;
    public curOrganization: Organization;
    private dragNodeParent: NzTreeNode;
    public accounts: Account[];

    constructor(private organizationApi: OrganizationApiService,
                private orgTreeService: OrganizationTreeService,
                private accountApi: AccountApiService,
                private router: Router,
                private modalService: NzModalService,
                private message: NzMessageService) {
    }

    ngOnInit() {
        this.orgTreeService.orgTreeChanged().subscribe(result => {
            this.orgTree = result;
            console.log(this.orgTree);
            this.curTreeNode = this.orgTree[0];
            this.curOrganization = this.curTreeNode.origin;
        });
        this.getOrgRoot();
    }

    private getOrgRoot() {
        this.organizationApi.getRoot().subscribe(result => {
            const organization = result.data;
            this.orgTreeService.setOrgTree(organization);
        });
    }


    public orgItemClick(e: NzFormatEmitEvent) {
        e.node.isSelected = true;
        this.curTreeNode = e.node;
        this.curOrganization = e.node.origin;
        this.getAccounts(e.node.origin);
    }

    public treeExpand(e: NzFormatEmitEvent) {
        const org = e.node.origin as Organization;
        if (!e.node.isExpanded || e.node.children.length > 0) {
            return;
        }
        this.organizationApi.getChildren(org.organizationId).subscribe(result => {
            this.orgTreeService.setChildren(e.node, result.data);
            e.node.isLoading = false;
        });

    }

    private getAccounts(org: Organization) {
        if (org.parentId === 'ROOT') {
            this.accountApi.list(1, 20).subscribe(result => {
                this.accounts = result.data;
            });
        } else {
            this.organizationApi.accounts(org.id, true).subscribe(result => {
                this.accounts = result.data;
            });
        }

    }

    public openOrganizationCreateModal() {
        const modal = this.modalService.create({
            nzTitle: '创建组织',
            nzContent: OrganizationCreateModalComponent,
            nzComponentParams: {
                parentOrganization: this.curOrganization || null
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
            if (postData.parentId === this.curOrganization.organizationId) {
                const newNode = new NzTreeNode({
                    title: result.data.name,
                    key: result.data.id.toString()
                });
                newNode.origin = result.data;
                newNode.isLeaf = true;
                this.curTreeNode.isLeaf = false;
                this.curTreeNode.children.push(newNode);
            } else {
                this.getOrgRoot();
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
            account: {
                username: accountForm.get('username').value,
                name: accountForm.get('name').value,
                email: accountForm.get('email').value,
                phone: accountForm.get('phone').value,
                isAdmin: accountForm.get('isAdmin').value
            },
            organizationIds: [this.curOrganization.organizationId]

        };
        this.accountApi.create(postData).subscribe(result => {
            modal.close();
            this.getAccounts(this.curOrganization);
            this.message.success('添加成功');
        });

    }

    public deleteOrganization() {
        this.modalService.confirm({
            nzTitle: '确定要删除此部门吗？',
            nzOnOk: (a) => {
                console.log(this.curTreeNode);
                this.organizationApi.delete(this.curOrganization.organizationId).subscribe(result => {
                    const parentNode = this.curTreeNode.getParentNode();
                    console.log(parentNode);
                    const index = parentNode.children.findIndex(n => n.key === this.curTreeNode.key);
                    parentNode.children.splice(index, 1);
                });
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
