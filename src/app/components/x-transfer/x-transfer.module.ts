import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {XTransferComponent} from './x-transfer.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {XTransItemSearchPipe, XTransSDataPipe} from './x-transfer.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [
        XTransferComponent,
        XTransSDataPipe,
        XTransItemSearchPipe
    ],
    exports: [
        XTransferComponent
    ]
})
export class XTransferModule {
}
