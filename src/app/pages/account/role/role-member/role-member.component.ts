import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoleApiService} from '../../../../services/role-api.service';
import {Role} from '../models/role';
import {Account} from '../../organization/models/account';
import {NzModalService} from 'ng-zorro-antd';
import {RoleMembersBindModalComponent} from '../components/role-members-bind-modal/role-members-bind-modal.component';

@Component({
    selector: 'app-role-member',
    templateUrl: './role-member.component.html',
    styleUrls: ['./role-member.component.scss'],
    providers: [RoleApiService]
})
export class RoleMemberComponent implements OnInit {
    public role: Role;
    public members: Account[];
    public page: number;
    public size: number;
    public total: number;

    constructor(private route: ActivatedRoute,
                private roleApi: RoleApiService,
                private modalService: NzModalService) {
        this.members = [];
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
            this.page = result.data.pagination.page;
            this.total = result.data.pagination.total;
        });
    }

    public pageChange(page: number) {
        this.getMembers(this.role.roleId, page);
    }

    public bindAccount() {
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
                    onClick: () => {
                        modal.close();
                    }
                }
            ]
        });
    }

    public removeMember(data: Account) {

    }
}
