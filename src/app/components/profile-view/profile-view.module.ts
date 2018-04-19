import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileViewComponent} from './profile-view.component';
import {ProfileViewService} from './profile-view.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [ProfileViewComponent],
    entryComponents: [ProfileViewComponent],
    providers: [ProfileViewService]
})
export class ProfileViewModule {
}
