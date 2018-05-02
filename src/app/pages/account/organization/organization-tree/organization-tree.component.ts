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
import {ProfileService} from '../../../../components/profile/profile.service';
import {AccountStatus, AccountStatusEnum} from '../models/account-status-enum.enum';


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
    public accountStatusEnum = AccountStatusEnum;
    public accountStatus = AccountStatus;

    constructor(private organizationApi: OrganizationApiService,
                private orgTreeService: OrganizationTreeService,
                private accountApi: AccountApiService,
                private router: Router,
                private profileService: ProfileService,
                private modalService: NzModalService,
                private message: NzMessageService) {
    }

    ngOnInit() {
        this.orgTreeService.orgTreeChanged().subscribe(result => {
            this.orgTree = result;
            this.curTreeNode = this.orgTree[0];
            this.curOrganization = this.curTreeNode.origin;
        });
        this.getOrgRoot();
    }

    private getOrgRoot() {
        this.organizationApi.getRoot().subscribe(result => {
            const organization = result.data;
            this.orgTreeService.setOrgTree(organization);
            this.getAccounts(organization);
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

    public openOrganizationCreateModal(organization?: Organization) {
        const modal = this.modalService.create({
            nzTitle: organization ? '编辑部门' : '创建部门',
            nzContent: OrganizationCreateModalComponent,
            nzComponentParams: {
                parentOrganization: this.curOrganization || null,
                organization: organization
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
                        this.createOrganization(organization && organization.id, a.orgForm, modal);
                    }
                }
            ]
        });
    }

    private createOrganization(id: number, orgForm: FormGroup, modal: NzModalRef) {
        const postData = {
            parentId: orgForm.get('parentId').value,
            name: orgForm.get('name').value,
            description: orgForm.get('description').value,
            isClass: orgForm.get('isClass').value
        };
        if (id) {
            this.organizationApi.update(id, postData).subscribe(result => {
                modal.close();
                if (this.curOrganization.parentId === result.data.parentId) {
                    this.curTreeNode.title = result.data.name;
                    this.curTreeNode.origin = result.data;
                    this.curOrganization = this.curTreeNode.origin;
                } else {
                    this.getOrgRoot();
                }
                this.message.success('更新成功');
            });
        } else {
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

    }

    public openCreateAccountModal(account?: Account) {
        const modal = this.modalService.create({
            nzTitle: '添加员工',
            nzContent: OrganizationAccountCreateModalComponent,
            nzComponentParams: {
                account: account,
                organization: this.curOrganization
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
                    disabled: (a) => a.accountForm.invalid,
                    onClick: (a) => {
                        this.createAccount(account && account.id, a.accountForm, modal);
                    }
                }
            ]
        });
    }

    public createAccount(id: number, accountForm: FormGroup, modal: NzModalRef) {
        const postData = {
            username: accountForm.get('username').value,
            name: accountForm.get('name').value,
            email: accountForm.get('email').value,
            phone: accountForm.get('phone').value,
            organizationIds: accountForm.get('organizationIds') ? accountForm.get('organizationIds').value : [this.curOrganization.organizationId],
            isAdmin: accountForm.get('isAdmin').value
        };
        if (id) {
            this.accountApi.update(id, postData).subscribe(result => {
                modal.close();
                this.getAccounts(this.curOrganization);
                this.message.success('更新成功');
            });
        } else {
            this.accountApi.create(postData).subscribe(result => {
                modal.close();
                this.getAccounts(this.curOrganization);
                this.message.success('添加成功');
            });
        }


    }

    public updateAccountClick(account: Account) {
        this.accountApi.detail(account.id).subscribe(result => {
            this.openCreateAccountModal(result.data);
        });
    }

    public profileView(account: Account) {
        this.accountApi.detail(account.id).subscribe(result => {
            this.profileService.view(result.data);
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

    public changeAccountStatus(account: Account, status: AccountStatusEnum) {
        let s = '';
        switch (status) {
            case this.accountStatusEnum.NORMAL:
                s = '启用';
                break;
            case this.accountStatusEnum.BLOCKED:
                s = '停用';
                break;
            case this.accountStatusEnum.DELETED:
                s = '删除';
                break;
        }
        this.modalService.confirm({
            nzTitle: '确定要' + s + '此帐号吗？',
            nzOnOk: () => {
                console.log(account);
                this.accountApi.changeStatus(account.id, status).subscribe(result => {
                    account.status = result.data.status;
                    this.message.success(s + '成功');
                    if (result.data.status === this.accountStatusEnum.DELETED) {
                        this.getAccounts(this.curOrganization);
                    }
                });
            }
        });
    }
}
