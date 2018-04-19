import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from './nav.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ProfileViewModule} from '../profile-view/profile-view.module';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule.forRoot(),
        ProfileViewModule
    ],
    declarations: [NavComponent],
    exports: [NavComponent]
})
export class NavModule {
}
