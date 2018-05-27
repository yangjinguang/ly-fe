import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleComponent} from './role.component';
import {RoleListComponent} from './role-list/role-list.component';
import {RoleRoutingModule} from './role-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RoleCreateModalComponent} from './components/role-create-modal/role-create-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoleMemberComponent} from './role-member/role-member.component';
import {RoleMembersBindModalComponent} from './components/role-members-bind-modal/role-members-bind-modal.component';
import {XTransferModule} from '../../../components/x-transfer/x-transfer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RoleRoutingModule,
        NgZorroAntdModule.forRoot(),
        XTransferModule
    ],
    declarations: [
        RoleComponent,
        RoleListComponent,
        RoleCreateModalComponent,
        RoleMemberComponent,
        RoleMembersBindModalComponent
    ],
    entryComponents: [
        RoleCreateModalComponent,
        RoleMembersBindModalComponent
    ]
})
export class RoleModule {
}
