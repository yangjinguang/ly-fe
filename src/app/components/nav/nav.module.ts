import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from './nav.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {TokenService} from '../../services/token.service';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule.forRoot(),
    ],
    declarations: [NavComponent],
    exports: [NavComponent],
    providers: [TokenService]
})
export class NavModule {
}
