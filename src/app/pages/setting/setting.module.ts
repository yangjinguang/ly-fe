import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingComponent} from './setting.component';
import {StudentProfileTemplateComponent} from './student-profile-template/student-profile-template.component';
import {SettingRoutingModule} from './setting-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {StudentProfileTemplatePropertyAddModalComponent} from './components/student-profile-template-property-add-modal/student-profile-template-property-add-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SettingRoutingModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [
        SettingComponent,
        StudentProfileTemplateComponent,
        StudentProfileTemplatePropertyAddModalComponent
    ],
    entryComponents: [
        StudentProfileTemplatePropertyAddModalComponent
    ]
})
export class SettingModule {
}
