import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationComponent} from './organization.component';
import {OrganizationTreeComponent} from './organization-tree/organization-tree.component';

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
