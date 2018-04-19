import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationComponent} from './organization.component';
import {OrganizationListComponent} from './organization-list/organization-list.component';
import {OrganizationCreateComponent} from './organization-create/organization-create.component';

const routes: Routes = [
    {
        path: '',
        component: OrganizationComponent,
        children: [
            {
                path: 'list',
                component: OrganizationListComponent
            },
            {
                path: 'create',
                component: OrganizationCreateComponent
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
export class OrganizationRoutingModule {
}
