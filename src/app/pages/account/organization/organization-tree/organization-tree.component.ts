import {Component, OnInit} from '@angular/core';
import {NzFormatEmitEvent, NzMessageService, NzModalRef, NzModalService, NzTreeNode} from 'ng-zorro-antd';
import {OrganizationApiService} from '../../../../services/organization-api.service';
import {OrganizationTreeService} from '../services/organization-tree.service';
import {Router} from '@angular/router';
import {OrganizationCreateModalComponent} from '../components/organization-create-modal/organization-create-modal.component';
import {FormGroup} from '@angular/forms';
import {OrganizationContactCreateModalComponent} from '../components/organization-contact-create-modal/organization-contact-create-modal.component';
import {AccountApiService} from '../../../../services/account-api.service';
import {Organization} from '../models/organization';
import {Account} from '../models/account';
import {ProfileService} from '../../../../components/profile/profile.service';
import {ContactStatusTrans, ContactStatus} from '../enums/contactStatus';
import {ContactApiService} from '../../../../services/contact-api.service';
import {Contact} from '../models/contact';


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
    public contacts: Contact[];
    public accountStatus = ContactStatus;
    public accountStatusTrans = ContactStatusTrans;
    public dragOrgParentId: string;
    public page: number;
    public size: number;
    public total: number;

    constructor(private organizationApi: OrganizationApiService,
                private orgTreeService: OrganizationTreeService,
                private contactApi: ContactApiService,
                private router: Router,
                private profileService: ProfileService,
                private modalService: NzModalService,
                private message: NzMessageService) {
        this.page = 1;
        this.size = 20;
        this.contacts = [];
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
            this.getAccounts(organization, this.page);
        });
    }


    public orgItemClick(e: NzFormatEmitEvent) {
        e.node.isSelected = true;
        this.curTreeNode = e.node;
        this.curOrganization = e.node.origin;
        this.getAccounts(e.node.origin, 1);
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

    private getAccounts(org: Organization, page: number) {
        if (org.parentId === 'ROOT') {
            this.contactApi.list(page, this.size).subscribe(result => {
                this.contacts = result.data.list;
                this.page = result.data.pagination.page;
                this.total = result.data.pagination.total;
            });
        } else {
            this.organizationApi.contacts(org.id, page, this.size, true).subscribe(result => {
                this.contacts = result.data.list;
                this.page = result.data.pagination.page;
                this.total = result.data.pagination.total;
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
                    this.curTreeNode.children.push(newNode);
                } else {
                    this.getOrgRoot();
                }
                this.message.success('创建成功');
            });
        }

    }

    public openCreateContactModal(contact?: Contact) {
        const modal = this.modalService.create({
            nzTitle: contact ? '编辑' : '添加' + '员工',
            nzContent: OrganizationContactCreateModalComponent,
            nzComponentParams: {
                contact: contact,
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
                    disabled: (a) => a.contactForm.invalid,
                    onClick: (a) => {
                        this.createContact(contact && contact.id, a.contactForm, modal);
                    }
                }
            ]
        });
    }

    public createContact(id: number, contactForm: FormGroup, modal: NzModalRef) {
        const postData = {
            username: contactForm.get('username').value,
            name: contactForm.get('name').value,
            email: contactForm.get('email').value,
            phone: contactForm.get('phone').value,
            organizationIds: contactForm.get('organizationIds') ? contactForm.get('organizationIds').value : [this.curOrganization.organizationId],
            isAdmin: contactForm.get('isAdmin').value
        };
        if (id) {
            this.contactApi.update(id, postData).subscribe(result => {
                modal.close();
                this.getAccounts(this.curOrganization, this.page);
                this.message.success('更新成功');
            });
        } else {
            this.contactApi.create(postData).subscribe(result => {
                modal.close();
                this.getAccounts(this.curOrganization, this.page);
                this.message.success('添加成功');
            });
        }


    }

    public updateAccountClick(account: Account) {
        this.contactApi.detail(account.id).subscribe(result => {
            this.openCreateContactModal(result.data);
        });
    }

    public profileView(account: Account) {
        this.contactApi.detail(account.id).subscribe(result => {
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

    public orgDragStart(e: NzFormatEmitEvent) {
        this.dragOrgParentId = e.dragNode.origin.parentId;
    }

    private changeOrder(node: NzTreeNode) {
        const ids = [];
        node.children.forEach(child => {
            ids.push(child.origin.id);
        });
        this.organizationApi.order(ids).subscribe();
    }

    public orgDrop(e: NzFormatEmitEvent) {
        console.log(e);
        const dragNode = e.dragNode;
        const dropNode = e.node;
        if (dragNode.origin.parentId !== dragNode.parentNode.origin.organizationId) {
            const postData = {
                parentId: dragNode.parentNode.origin.organizationId
            };
            this.organizationApi.update(dragNode.origin.id, postData).subscribe(result => {
                this.changeOrder(dragNode.parentNode);
            });
        } else {
            this.changeOrder(dragNode.parentNode);
        }
    }

    public changeContactStatus(contact: Contact, status: ContactStatus) {
        let s = '';
        switch (status) {
            case this.accountStatus.NORMAL:
                s = '启用';
                break;
            case this.accountStatus.BLOCKED:
                s = '停用';
                break;
            case this.accountStatus.DELETED:
                s = '删除';
                break;
        }
        this.modalService.confirm({
            nzTitle: '确定要' + s + '此帐号吗？',
            nzOnOk: () => {
                console.log(contact);
                this.contactApi.changeStatus(contact.id, status).subscribe(result => {
                    contact.status = result.data.status;
                    this.message.success(s + '成功');
                    if (result.data.status === this.accountStatus.DELETED) {
                        this.getAccounts(this.curOrganization, this.page);
                    }
                });
            }
        });
    }

    public pageChange(page: number) {
        if (page && page !== this.page) {
            this.getAccounts(this.curOrganization, page);
        }
    }
}
