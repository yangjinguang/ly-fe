import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoleApiService} from '../../../../services/role-api.service';
import {Role} from '../models/role';
import {Account} from '../../organization/models/account';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {RoleMembersBindModalComponent} from '../components/role-members-bind-modal/role-members-bind-modal.component';
import {Contact} from '../../organization/models/contact';

@Component({
    selector: 'app-role-member',
    templateUrl: './role-member.component.html',
    styleUrls: ['./role-member.component.scss'],
    providers: [RoleApiService]
})
export class RoleMemberComponent implements OnInit {
    public role: Role;
    public members: Contact[];
    public page: number;
    public size: number;
    public total: number;

    constructor(private route: ActivatedRoute,
                private roleApi: RoleApiService,
                private modalService: NzModalService,
                private msg: NzMessageService) {
        this.members = [];
        this.page = 1;
        this.size = 20;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params['id']);
            this.getRoleDetail(params['id']);
        });
    }

    private getRoleDetail(id: number) {
        if (!id) {
            return;
        }
        this.roleApi.detail(id).subscribe(result => {
            this.role = result.data;
            this.getMembers(this.role.roleId, this.page);
        });
    }

    private getMembers(roleId: string, page: number) {
        this.roleApi.members(roleId, page, this.size).subscribe(result => {
            this.members = result.data.list;
            console.log(this.members);
            this.page = result.data.pagination.page;
            this.total = result.data.pagination.total;
        });
    }

    public pageChange(page: number) {
        if (page && this.total > 0) {
            this.getMembers(this.role.roleId, page);
        }
    }

    public bindAccountModalOpen() {
        const modal = this.modalService.create({
            nzTitle: '成员绑定',
            nzContent: RoleMembersBindModalComponent,
            nzComponentParams: {
                role: this.role
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
                    disabled: (a) => a.selectedUsers.length <= 0,
                    onClick: (a) => {
                        this.bindContacts(a.selectedUsers, modal);
                    }
                }
            ]
        });
    }

    private bindContacts(selectedUsers: Contact[], modal: NzModalRef) {
        console.log(selectedUsers);
        modal.close();
        this.roleApi.bindMembers(this.role.roleId, selectedUsers.map(i => i.accountId)).subscribe(result => {
            this.getMembers(this.role.roleId, this.page);
        });
    }

    public removeMember(data: Account) {
        this.modalService.confirm({
            nzTitle: '确定要移除此账户吗?',
            nzOnOk: () => {
                this.roleApi.unBindMembers(this.role.roleId, [data.accountId]).subscribe(result => {
                    this.getMembers(this.role.roleId, this.page);
                    this.msg.success('移除成功');
                });
            }
        });

    }
}
