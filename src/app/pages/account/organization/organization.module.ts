import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationComponent} from './organization.component';
import {OrganizationRoutingModule} from './organization-routing.module';
import {OrganizationListComponent} from './organization-list/organization-list.component';
import {OrganizationTreeService} from './services/organization-tree.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrganizationCreateComponent} from './organization-create/organization-create.component';
import {XBreadCrumbService} from '../../../components/x-bread-crumb/x-bread-crumb.service';
import {XBreadCrumbModule} from '../../../components/x-bread-crumb/x-bread-crumb.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OrganizationRoutingModule,
        NgZorroAntdModule.forRoot(),
        XBreadCrumbModule
    ],
    declarations: [
        OrganizationComponent,
        OrganizationListComponent,
        OrganizationCreateComponent
    ],
    providers: [
        OrganizationTreeService,
        XBreadCrumbService
    ]
})
export class OrganizationModule {
}
