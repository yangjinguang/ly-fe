import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationComponent} from './organization.component';
import {OrganizationTreeComponent} from './organization-tree/organization-tree.component';
import {OrganizationRoutingModule} from './organization-routing.module';

@NgModule({
    imports: [
        CommonModule,
        OrganizationRoutingModule
    ],
    declarations: [
        OrganizationComponent,
        OrganizationTreeComponent
    ]
})
export class OrganizationModule {
}
