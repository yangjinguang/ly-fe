import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleComponent} from './role.component';
import {RoleListComponent} from './role-list/role-list.component';
import {RoleMemberComponent} from './role-member/role-member.component';

const routes: Routes = [
    {
        path: '',
        component: RoleComponent,
        children: [
            {
                path: 'list',
                component: RoleListComponent
            },
            {
                path: ':id/member',
                component: RoleMemberComponent
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule {
}
