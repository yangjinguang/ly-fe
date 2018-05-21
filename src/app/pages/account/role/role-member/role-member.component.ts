import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoleApiService} from '../../../../services/role-api.service';
import {Role} from '../models/role';
import {Account} from '../../organization/models/account';

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
                private roleApi: RoleApiService) {
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

    }
}
