import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingComponent} from './setting.component';
import {StudentProfileTemplateComponent} from './student-profile-template/student-profile-template.component';

const routes: Routes = [
    {
        path: '',
        component: SettingComponent,
        children: [
            {
                path: 'student-profile-template',
                component: StudentProfileTemplateComponent
            },
            {
                path: '',
                redirectTo: 'student-profile-template',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule {
}
