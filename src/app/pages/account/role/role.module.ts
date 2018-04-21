import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleComponent} from './role.component';
import {RoleListComponent} from './role-list/role-list.component';
import {RoleRoutingModule} from './role-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        RoleRoutingModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [
        RoleComponent,
        RoleListComponent
    ]
})
export class RoleModule {
}
