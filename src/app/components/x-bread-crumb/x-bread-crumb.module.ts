import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {XBreadCrumbComponent} from './x-bread-crumb.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [XBreadCrumbComponent],
    exports: [XBreadCrumbComponent]
})

export class XBreadCrumbModule {
}
