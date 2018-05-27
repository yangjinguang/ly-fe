import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileService} from './profile.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ContactApiService} from '../../services/contact-api.service';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [ProfileComponent],
    entryComponents: [ProfileComponent],
    providers: [ProfileService, ContactApiService]
})
export class ProfileModule {
}
