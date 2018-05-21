import {Component, OnInit} from '@angular/core';
import {RoleApiService} from '../../../../services/role-api.service';
import {Role} from '../models/role';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {RoleCreateModalComponent} from '../components/role-create-modal/role-create-modal.component';
import {FormGroup} from '@angular/forms';
import {HttpError} from '../../../../libs/http/http-error';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
    providers: [RoleApiService]
})
export class RoleListComponent implements OnInit {
    public roles: Role[];
    public page: number;
    public size: number;
    public total: number;

    constructor(private roleApi: RoleApiService,
                private modalService: NzModalService,
                private msg: NzMessageService) {
        this.page = 1;
        this.size = 20;
    }

    ngOnInit() {
        this.getRoles(1);
    }

    private getRoles(page: number) {
        this.roleApi.list(1, 20).subscribe(result => {
            this.roles = result.data.list;
            this.page = result.data.pagination.page;
            this.total = result.data.pagination.total;
        });
    }

    public createRoleOpen(role?: Role) {
        const modal = this.modalService.create({
            nzTitle: role ? '创建' : '更新' + '角色',
            nzContent: RoleCreateModalComponent,
            nzComponentParams: {
                role: role
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
                    label: '提交',
                    type: 'primary',
                    disabled: (a) => a.roleForm.invalid,
                    onClick: (a) => {
                        this.createRole(a.roleForm, modal);
                    }
                }
            ]
        });
    }

    public createRole(roleForm: FormGroup, modal: NzModalRef) {
        const postData = {
            name: roleForm.get('name').value,
            description: roleForm.get('description').value
        };
        const id = roleForm.get('id').value;
        if (id) {
            this.roleApi.update(id, postData).subscribe(result => {
                this.getRoles(this.page);
                modal.close();
            }, err => {
                if (err.exception === 'org.springframework.dao.DuplicateKeyException') {
                    this.msg.error('角色名重复');
                }
            });
        } else {
            this.roleApi.create(postData).subscribe(result => {
                this.getRoles(this.page);
                modal.close();
            }, (err: HttpError) => {
                if (err.exception === 'org.springframework.dao.DuplicateKeyException') {
                    this.msg.error('角色名重复');
                }
            });
        }
    }

    public pageChange(page: number) {
        this.getRoles(page);
    }

    public enabledOrDisabled(role: Role, enabled: boolean) {
        this.roleApi.enabledOrDisabled(role.id, enabled).subscribe(result => {
            role.enabled = result.data.enabled;
        });
    }

    public deleteRole(role: Role) {
        this.modalService.confirm({
            nzTitle: '确定要删除此角色吗？',
            nzOnOk: () => {
                this.roleApi.delete(role.id).subscribe(result => {
                    this.getRoles(this.page);
                    this.msg.success('删除成功');
                });
            }
        });

    }
}
