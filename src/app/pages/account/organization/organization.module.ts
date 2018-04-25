import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationComponent} from './organization.component';
import {OrganizationRoutingModule} from './organization-routing.module';
import {OrganizationTreeService} from './services/organization-tree.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {XBreadCrumbService} from '../../../components/x-bread-crumb/x-bread-crumb.service';
import {XBreadCrumbModule} from '../../../components/x-bread-crumb/x-bread-crumb.module';
import {OrganizationTreeComponent} from './organization-tree/organization-tree.component';
import {OrganizationCreateModalComponent} from './components/organization-create-modal/organization-create-modal.component';

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
        OrganizationTreeComponent,
        OrganizationCreateModalComponent
    ],
    providers: [
        OrganizationTreeService,
        XBreadCrumbService
    ],
    entryComponents: [
        OrganizationCreateModalComponent
    ]
})
export class OrganizationModule {
}
