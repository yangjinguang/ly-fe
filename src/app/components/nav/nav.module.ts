import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from './nav.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule.forRoot(),
    ],
    declarations: [NavComponent],
    exports: [NavComponent]
})
export class NavModule {
}
