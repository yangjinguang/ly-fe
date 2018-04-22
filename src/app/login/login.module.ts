import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginTenantSelectComponent} from './login-tenant-select/login-tenant-select.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [
        LoginComponent,
        LoginTenantSelectComponent
    ],
    entryComponents: [
        LoginTenantSelectComponent
    ]
})
export class LoginModule {
}
