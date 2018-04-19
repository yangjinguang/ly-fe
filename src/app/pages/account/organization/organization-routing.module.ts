import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationTreeComponent} from './organization-tree/organization-tree.component';
import {OrganizationComponent} from './organization.component';

const routes: Routes = [
    {
        path: '',
        component: OrganizationComponent,
        children: [
            {
                path: 'tree',
                component: OrganizationTreeComponent
            },
            {
                path: '',
                redirectTo: 'tree',
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
