import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account.component';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: 'organization',
                loadChildren: './organization/organization.module#OrganizationModule'
            },
            {
                path: 'role',
                loadChildren: './role/role.module#RoleModule'
            },
            {
                path: '',
                redirectTo: 'organization',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
